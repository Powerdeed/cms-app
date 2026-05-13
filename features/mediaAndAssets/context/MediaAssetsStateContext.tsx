"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Asset } from "@global components/layout/fileUploader";

type MediaAssetsState = {
  allMediaAssets: Asset[];
  setAllMediaAssets: Dispatch<SetStateAction<Asset[]>>;
  mediaAssets: Asset[];
  setMediaAssets: Dispatch<SetStateAction<Asset[]>>;

  showDeleteOptions: boolean;
  setShowDeleteOptions: Dispatch<SetStateAction<boolean>>;
};

export const MediaAssetsStateContext = createContext<MediaAssetsState | null>(
  null,
);
