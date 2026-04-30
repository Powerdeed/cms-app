"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Asset } from "../types/mediaAssets.types";
import { AssetUsagePaths } from "../constants/assetUsagePaths";

type MediaAssetsState = {
  // asset and meta
  mediaAssets: Asset[];
  setMediaAssets: Dispatch<SetStateAction<Asset[]>>;
  currentAsset: Asset | null;
  setCurrentAsset: Dispatch<SetStateAction<Asset | null>>;
  targetAssetType: "image" | "document" | "diagram" | "All";
  setTargetAssetType: Dispatch<
    SetStateAction<"image" | "document" | "diagram" | "All">
  >;
  assetMode: "new" | "existing" | null;
  setAssetMode: Dispatch<SetStateAction<"new" | "existing" | null>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  assetUsagePaths: AssetUsagePaths | null;
  setAssetUsagePaths: Dispatch<AssetUsagePaths | null>;
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  firstPathArr: string[] | null;
  setFirstPathArr: Dispatch<SetStateAction<string[] | null>>;
  assetCategory: string;
  setAssetCategory: Dispatch<SetStateAction<string>>;
  firstPath: string;
  setFirstPath: Dispatch<SetStateAction<string>>;
  secondPaths: string[];
  setSecondPaths: Dispatch<SetStateAction<string[]>>;
  secondPath: string;
  setSecondPath: Dispatch<SetStateAction<string>>;
  hasFeaturePath: boolean;
  setHasFeaturePath: Dispatch<SetStateAction<boolean>>;
  featurePath: string;
  setFeaturePath: Dispatch<SetStateAction<string>>;

  // clipBoard states
  copying: boolean;
  setCopying: Dispatch<SetStateAction<boolean>>;
};

export const MediaAssetsStateContext = createContext<MediaAssetsState | null>(
  null,
);
