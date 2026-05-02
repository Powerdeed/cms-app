"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Asset } from "../types/mediaAssets.types";
import { AssetUsagePaths } from "../constants/assetUsagePaths";

type MediaAssetsState = {
  // asset and meta
  mediaAssets: Asset[];
  setMediaAssets: Dispatch<SetStateAction<Asset[]>>;
  targetAsset: Asset | null;
  setTargetAsset: Dispatch<SetStateAction<Asset | null>>;
  assetMode: "new" | "existing" | null;
  setAssetMode: Dispatch<SetStateAction<"new" | "existing" | null>>;
  assetUsagePaths: AssetUsagePaths | null;
  setAssetUsagePaths: Dispatch<AssetUsagePaths | null>;
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

  // clipBoard states
  copying: boolean;
  setCopying: Dispatch<SetStateAction<boolean>>;
};

export const MediaAssetsStateContext = createContext<MediaAssetsState | null>(
  null,
);
