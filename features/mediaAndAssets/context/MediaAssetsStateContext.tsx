"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Asset } from "@global components/layout/fileUploader";

type MediaAssetsState = {
  mediaAssets: Asset[];
  setMediaAssets: Dispatch<SetStateAction<Asset[]>>;

  showDeleteOptions: boolean;
  setShowDeleteOptions: Dispatch<SetStateAction<boolean>>;
};

export const MediaAssetsStateContext = createContext<MediaAssetsState | null>(
  null,
);
