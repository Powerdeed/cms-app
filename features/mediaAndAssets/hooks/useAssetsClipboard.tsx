"use client";

import { useContext } from "react";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";

export default function useAssetsClipboard() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);

  if (!mediaAssetsState) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { targetAsset, setCopying } = mediaAssetsState;

  const handleCopyAssetPath = async (value?: string) => {
    if (!targetAsset) return;

    setCopying(true);

    try {
      await navigator.clipboard.writeText(
        value ?? targetAsset.storage?.objectName ?? targetAsset.fullPath ?? "",
      );

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
