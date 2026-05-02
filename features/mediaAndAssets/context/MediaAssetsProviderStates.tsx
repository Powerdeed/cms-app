"use client";

import { useState } from "react";
import { MediaAssetsStateContext } from "./MediaAssetsStateContext";
import { Asset } from "../types/mediaAssets.types";
import { getMediaAssets } from "../services/mediaAssets";
import { AssetUsagePaths } from "../constants/assetUsagePaths";

export default function MediaAssetsProviderState({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mediaAssets, setMediaAssets] = useState<Asset[]>(getMediaAssets());
  const [targetAsset, setTargetAsset] = useState<Asset | null>(null);
  const [assetMode, setAssetMode] = useState<"new" | "existing" | null>(null);
  const [copying, setCopying] = useState(false);
  const [assetUsagePaths, setAssetUsagePaths] =
    useState<AssetUsagePaths | null>(null);
  const [firstPathArr, setFirstPathArr] = useState<string[] | null>(null);
  const [assetCategory, setAssetCategory] = useState("");
  const [firstPath, setFirstPath] = useState("");
  const [secondPaths, setSecondPaths] = useState([""]);
  const [secondPath, setSecondPath] = useState("");

  return (
    <MediaAssetsStateContext.Provider
      value={{
        mediaAssets,
        setMediaAssets,
        targetAsset,
        setTargetAsset,
        assetMode,
        setAssetMode,
        copying,
        setCopying,
        assetUsagePaths,
        setAssetUsagePaths,
        firstPathArr,
        setFirstPathArr,
        assetCategory,
        setAssetCategory,
        firstPath,
        setFirstPath,
        secondPaths,
        setSecondPaths,
        secondPath,
        setSecondPath,
      }}
    >
      {children}
    </MediaAssetsStateContext.Provider>
  );
}
