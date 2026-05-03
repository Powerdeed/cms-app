"use client";

import { useContext, useEffect } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";
import { Asset, AssetUsagePaths } from "../types/asset.types";

const resolveUsagePaths = async (
  source: Promise<AssetUsagePaths> | AssetUsagePaths | null,
) => {
  if (!source) return null;
  return await source;
};

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
  } = fileMetadataState;

  const {
    hasFeaturePath,
    setFileName,
    setHasFeaturePath,
    featurePath,
    setFeaturePath,
  } = fileUploaderState;

  const pathSetter = (path: string) => {
    setHasFeaturePath(true);
    setFeaturePath(path);
  };

  const parseAssetPath = (assetPath: string) => {
    const paths = assetPath.split("/").filter(Boolean);
    const hasFileName = paths.length > 0 && paths.at(-1)?.includes(".");
    const pathParts = hasFileName ? paths.slice(0, -1) : paths;
    const category = pathParts[0] ?? "";
    const firstPath = pathParts[1] ?? "";
    const secondPath = pathParts[2] ?? "";
    const name = hasFileName ? paths.at(-1) || "" : "";
    const usage = firstPath
      ? `${firstPath}${secondPath ? `/${secondPath}` : ""}`
      : "";

    return {
      category,
      firstPath,
      secondPath,
      name,
      usage,
      fullPath: `${category}${usage ? "/" + usage : ""}${name ? "/" + name : ""}`,
    };
  };

  const getFirstPaths = async (category: keyof AssetUsagePaths) => {
    setFirstPath("");
    setSecondPath("");

    if (category) {
      const assetPaths = await resolveUsagePaths(assetUsagePaths);

      if (!assetPaths) return;

      const targetPath = assetPaths[category];

      setFirstPathArr(
        targetPath ? targetPath.map((path) => path.split("-")[0]) : [],
      );
    }
  };

  useEffect(() => {
    const fetchSecondPaths = async () => {
      const assetPaths = await resolveUsagePaths(assetUsagePaths);

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

  const updatePathSetters = (asset?: Asset) => {
    const assetPath = asset
      ? (asset.storage?.objectName ?? asset.fullPath ?? "")
      : featurePath;
    const { category, firstPath, secondPath, name, usage, fullPath } =
      parseAssetPath(assetPath);

    if (name) setFileName(name);
    setAssetCategory(category);
    getFirstPaths(category);
    setFirstPath(firstPath);
    setSecondPath(secondPath);
    setAssetUsage(usage);

    return {
      category,
      firstPath,
      secondPath,
      usage,
      fullPath,
    };
  };

  return {
    getFirstPaths,
    updatePathSetters,
    pathSetter,
  };
}
