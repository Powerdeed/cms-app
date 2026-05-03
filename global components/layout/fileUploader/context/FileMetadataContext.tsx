"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { Asset, AssetUsagePaths } from "../types/asset.types";

export type AssetMode = "new" | "existing" | null;

type FileMetadataState = {
  targetAsset: Asset | null;
  setTargetAsset: Dispatch<SetStateAction<Asset | null>>;
  assetMode: AssetMode;
  setAssetMode: Dispatch<SetStateAction<AssetMode>>;
  copying: boolean;
  setCopying: Dispatch<SetStateAction<boolean>>;
  assetUsagePaths: AssetUsagePaths | null;
  setAssetUsagePaths: Dispatch<SetStateAction<AssetUsagePaths | null>>;
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
  assetUsage: string;
  setAssetUsage: Dispatch<SetStateAction<string>>;
};

export const FileMetadataContext = createContext<FileMetadataState | null>(
  null,
);
