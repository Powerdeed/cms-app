"use client";

import { createContext, Dispatch, SetStateAction } from "react";

import { Asset } from "@global components/layout/fileUploader";

type MediaAssetsState = {
  mediaAssets: Asset[];
  setMediaAssets: Dispatch<SetStateAction<Asset[]>>;
};

export const MediaAssetsStateContext = createContext<MediaAssetsState | null>(
  null,
);
