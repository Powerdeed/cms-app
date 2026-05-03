"use client";

import { useContext } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";

export default function useFileUploaderClipboard() {
  const fileMetadataState = useContext(FileMetadataContext);

  if (!fileMetadataState) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  const { targetAsset, setCopying } = fileMetadataState;

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
