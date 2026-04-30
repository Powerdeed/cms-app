"use client";

import { useContext } from "react";

import { Asset } from "../types/mediaAssets.types";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";

export default function useAssetsClipboard() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);

  if (!mediaAssetsState) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { currentAsset, setCopying } = mediaAssetsState;

  const handleCopyAssetPath = async (key: keyof Asset) => {
    if (!currentAsset) return;

    setCopying(true);

    try {
      await navigator.clipboard.writeText(String(currentAsset[key]));

      setTimeout(() => {
        setCopying(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      setCopying(false);
    }
  };
  return { handleCopyAssetPath };
}
