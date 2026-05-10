"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { AssetReference } from "../types/asset.types";

type FileUploaderAssetLookUpContext = {
  searchedAsset: string;
  setSearchedAsset: Dispatch<SetStateAction<string>>;

  assetReference: AssetReference | null;
  setAssetReference: Dispatch<SetStateAction<AssetReference | null>>;

  lookingUpAsset: boolean;
  setLookingUpAsset: Dispatch<React.SetStateAction<boolean>>;

  assetLookUpError: string;
  setAssetLookUpError: Dispatch<React.SetStateAction<string>>;
};

export const fileUploaderAssetLookUpContext =
  createContext<FileUploaderAssetLookUpContext | null>(null);
