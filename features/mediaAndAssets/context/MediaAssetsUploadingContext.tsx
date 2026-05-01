"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type MediaAssetsUploadingStates = {
  uploadingAsset: boolean;
  setUploadingAsset: Dispatch<SetStateAction<boolean>>;

  errorUploadingAsset: boolean;
  setErrorUploadingAsset: Dispatch<SetStateAction<boolean>>;

  errorUploadingAssetMsg: string;
  setErrorUploadingAssetMsg: Dispatch<SetStateAction<string>>;
};

export const mediaAssetsUploadingContext =
  createContext<MediaAssetsUploadingStates | null>(null);
