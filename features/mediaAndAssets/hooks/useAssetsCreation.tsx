"use client";

import { useContext } from "react";

import useAssetPaths from "./useAssetsPaths";

import { Asset } from "../types/mediaAssets.types";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";

export default function useAssetsCreation() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);

  if (!mediaAssetsState) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { targetAsset, setTargetAsset, setAssetMode } = mediaAssetsState;

  const { updatePathSetters } = useAssetPaths();

  const handleTargetAsset = (
    mode: "new" | "existing" | null,
    asset?: Asset,
  ) => {
    setAssetMode(mode);
    updatePathSetters(asset);

    if (mode === "new" && targetAsset) {
      setTargetAsset(targetAsset);
    } else if (mode === "existing" && asset) {
      setTargetAsset(asset);
    }
  };
  return { handleTargetAsset };
}
