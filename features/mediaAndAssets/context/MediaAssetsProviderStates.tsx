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
  const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);
  const [targetAssetType, setTargetAssetType] = useState<Asset["type"] | "All">(
    "All",
  );
  const [file, setFile] = useState<File | null>(null);
  const [assetMode, setAssetMode] = useState<"new" | "existing" | null>(null);
  const [copying, setCopying] = useState(false);
  const [assetUsagePaths, setAssetUsagePaths] =
    useState<AssetUsagePaths | null>(null);
  const [firstPathArr, setFirstPathArr] = useState<string[] | null>(null);
  const [fileName, setFileName] = useState("");
  const [assetCategory, setAssetCategory] = useState("");
  const [firstPath, setFirstPath] = useState("");
  const [secondPaths, setSecondPaths] = useState([""]);
  const [secondPath, setSecondPath] = useState("");
  const [hasFeaturePath, setHasFeaturePath] = useState(false);
  const [featurePath, setFeaturePath] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");

  return (
    <MediaAssetsStateContext.Provider
      value={{
        mediaAssets,
        setMediaAssets,
        currentAsset,
        setCurrentAsset,
        targetAssetType,
        setTargetAssetType,
        file,
        setFile,
        assetMode,
        setAssetMode,
        copying,
        setCopying,
        assetUsagePaths,
        setAssetUsagePaths,
        firstPathArr,
        setFirstPathArr,
        fileName,
        setFileName,
        assetCategory,
        setAssetCategory,
        firstPath,
        setFirstPath,
        secondPaths,
        setSecondPaths,
        secondPath,
        setSecondPath,
        hasFeaturePath,
        setHasFeaturePath,
        featurePath,
        setFeaturePath,
        uploadedFile,
        setUploadedFile,
      }}
    >
      {children}
    </MediaAssetsStateContext.Provider>
  );
}
