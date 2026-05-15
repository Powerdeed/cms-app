"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Asset } from "@global components/layout/fileUploader";

type MediaAssetsState = {
  allMediaAssets: Asset[];
  setAllMediaAssets: Dispatch<SetStateAction<Asset[]>>;
  mediaAssets: Asset[];
  setMediaAssets: Dispatch<SetStateAction<Asset[]>>;
  fetchingMediaAssets: boolean;
  setFetchingMediaAssets: Dispatch<SetStateAction<boolean>>;
  deletingAssetIds: string[];
  setDeletingAssetIds: Dispatch<SetStateAction<string[]>>;
  downloadingAssetIds: string[];
  setDownloadingAssetIds: Dispatch<SetStateAction<string[]>>;

  showDeleteOptions: boolean;
  setShowDeleteOptions: Dispatch<SetStateAction<boolean>>;
};

export const MediaAssetsStateContext = createContext<MediaAssetsState | null>(
  null,
);
