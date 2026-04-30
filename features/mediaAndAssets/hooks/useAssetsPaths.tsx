"use client";

import { useEffect } from "react";
import { AssetUsagePaths, usagePaths } from "../constants/assetUsagePaths";

import { Asset } from "../types/mediaAssets.types";
import useMediaAssetsState from "./useAssetsState";

export default function useAssetsPaths() {
  const {
    firstPath,
    assetCategory,
    setFirstPath,
    setSecondPath,
    setFirstPathArr,
    setAssetCategory,
    setFileName,
    setSecondPaths,
    setAssetUsagePaths,
    hasFeaturePath,
  } = useMediaAssetsState();

  useEffect(() => {
    const fetchUsagePaths = async () => {
      if (hasFeaturePath) return;
      const paths = await usagePaths;

      if (!paths) return;

      setAssetUsagePaths(paths);
    };

    fetchUsagePaths();
  }, [hasFeaturePath, setAssetUsagePaths]);

  const getFirstPaths = async (category: keyof AssetUsagePaths) => {
    setFirstPath("");
    setSecondPath("");

    if (category) {
      const assetPaths = await usagePaths;

      if (!assetPaths) return;

      const targetPath = assetPaths[category];

      setFirstPathArr(
        targetPath ? targetPath.map((path) => path.split("-")[0]) : [],
      );
    }
  };

  useEffect(() => {
    const fetchSecondPaths = async () => {
      const assetPaths = await usagePaths;

      if (assetPaths) {
        const categoryBasedPaths =
          assetPaths[assetCategory as keyof AssetUsagePaths];

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
  }, [assetCategory, firstPath, hasFeaturePath, setSecondPaths]);

  const updatePathSetters = (asset?: Asset) => {
    const paths = asset?.fullPath.split("/").slice(0, -1);
    const category = paths ? paths[0] : "";
    const firstPath = paths ? paths[1] : "";
    const secondPath = paths ? paths[2] : "";
    const name = asset?.fullPath.split("/").pop() ?? "";
    const usage = firstPath
      ? `${firstPath}${secondPath ? `/${secondPath}` : ""}`
      : "";

    setFileName(name);
    setAssetCategory(category as keyof AssetUsagePaths);
    getFirstPaths(category as keyof AssetUsagePaths);
    setFirstPath(firstPath);
    setSecondPath(secondPath);

    return {
      firstPath,
      secondPath,
      usage,
      fullPath: `${category}${usage ? "/" + usage : ""}/${name}`,
    };
  };

  return {
    getFirstPaths,
    updatePathSetters,
  };
}
