"use client";

// modules
import { useCallback, useContext, useEffect } from "react";

// hooks
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";

// types
import { Asset, AssetUsagePaths } from "../types/asset.types";

// utils
import { createPathUrl } from "../utils/fileConversions";

// constants
import { usagePaths } from "../constants/assetUsagePaths";

export default function useFileUploaderPaths() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);

  if (!fileMetadataState || !fileUploaderState) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  const {
    firstPath,
    assetCategory,
    setFirstPath,
    setSecondPath,
    setFirstPathArr,
    setAssetCategory,
    setSecondPaths,
    assetUsagePaths,
    setAssetUsage,
    setAssetUsagePaths,
  } = fileMetadataState;

  const {
    hasFeaturePath,
    setFileName,
    setHasFeaturePath,
    featurePath,
    setFeaturePath,
  } = fileUploaderState;

  useEffect(() => {
    const loadAssetUsagePaths = async () => {
      setAssetUsagePaths(await usagePaths);
    };

    loadAssetUsagePaths();
  }, [setAssetUsagePaths]);

  const pathSetter = useCallback(
    (path: string) => {
      setHasFeaturePath(true);
      setFeaturePath(path);
    },
    [setFeaturePath, setHasFeaturePath],
  );

  const parseAssetPath = useCallback((assetPath: string) => {
    const paths = assetPath.split("/").filter(Boolean);
    const hasFileName = paths.length > 0 && paths.at(-1)?.includes(".");
    const pathParts = hasFileName ? paths.slice(0, -1) : paths;
    const category = pathParts[0] ?? "";
    const firstPath = pathParts[1] ?? "";
    const secondPath = pathParts[2] ?? "";
    const name = hasFileName ? paths.at(-1) || "" : "";
    const usage = createPathUrl([firstPath, secondPath]);

    return {
      category,
      firstPath,
      secondPath,
      name,
      usage,
      fullPath: createPathUrl([category, firstPath, secondPath, name]),
    };
  }, []);

  const getFirstPaths = useCallback(
    async (category: keyof AssetUsagePaths) => {
      setFirstPath("");
      setSecondPath("");

      if (category) {
        const assetPaths = await assetUsagePaths;

        if (!assetPaths) return;

        const targetPath = assetPaths[category];

        setFirstPathArr(
          targetPath ? targetPath.map((path) => path.split("-")[0]) : [],
        );
      }
    },
    [assetUsagePaths, setFirstPath, setFirstPathArr, setSecondPath],
  );

  useEffect(() => {
    const fetchSecondPaths = async () => {
      const assetPaths = await assetUsagePaths;

      if (assetPaths) {
        const categoryBasedPaths = assetPaths[assetCategory];

        if (!categoryBasedPaths) {
          setSecondPaths([]);
          return;
        }

        const hasSecondPath = categoryBasedPaths.every(
          (item) => item.split("-").length > 1,
        );

        if (firstPath && hasSecondPath) {
          const outputArr: string[] = [];

          categoryBasedPaths.map((paths) => {
            const path = paths.split("-")[1];

            if (paths.includes(firstPath)) {
              outputArr.push(path);
            }
          });
          setSecondPaths(outputArr);
        } else setSecondPaths([]);
      } else setSecondPaths([]);
    };

    if (firstPath && !hasFeaturePath) {
      fetchSecondPaths();
    }
  }, [
    assetCategory,
    assetUsagePaths,
    firstPath,
    hasFeaturePath,
    setSecondPaths,
  ]);

  const updatePathSetters = useCallback(
    (asset?: Asset, pathOverride?: string) => {
      const assetPath = pathOverride ?? asset?.fullPath ?? featurePath;
      const { category, firstPath, secondPath, name, usage, fullPath } =
        parseAssetPath(assetPath);
      const assetCategory = asset?.classification?.category ?? category;
      const assetUsage = asset?.classification?.usage ?? usage;
      const [assetFirstPath = "", assetSecondPath = ""] = assetUsage
        .split("/")
        .filter(Boolean);

      const displayName = asset?.name || name;

      if (displayName) setFileName(displayName);
      setAssetCategory(assetCategory);
      getFirstPaths(assetCategory);
      setFirstPath(assetFirstPath || firstPath);
      setSecondPath(assetSecondPath || secondPath);
      setAssetUsage(assetUsage);

      return {
        category: assetCategory,
        firstPath: assetFirstPath || firstPath,
        secondPath: assetSecondPath || secondPath,
        usage: assetUsage,
        fullPath: asset?.storage?.objectName ?? fullPath,
      };
    },
    [
      featurePath,
      getFirstPaths,
      parseAssetPath,
      setAssetCategory,
      setAssetUsage,
      setFileName,
      setFirstPath,
      setSecondPath,
    ],
  );

  return {
    getFirstPaths,
    updatePathSetters,
    pathSetter,
  };
}
