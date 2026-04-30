"use client";

import { useContext } from "react";

import useMediaAssetsState from "./useAssetsState";
import useAssetPaths from "./useAssetsPaths";

import { Asset } from "../types/mediaAssets.types";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";

export default function useAssetsCreation() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);

  if (!mediaAssetsState) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { setCurrentAsset, setAssetMode } = mediaAssetsState;

  const { updatePathSetters } = useAssetPaths();
  const { newEmptyAsset } = useMediaAssetsState();

  const handleCurrentAsset = (
    mode: "new" | "existing" | null,
    asset?: Asset,
  ) => {
    setAssetMode(mode);
    updatePathSetters(asset);

    if (mode === "new") {
      setCurrentAsset(newEmptyAsset);
    } else if (mode === "existing" && asset) {
      setCurrentAsset(asset);
    }
  };
  return { handleCurrentAsset };
}
