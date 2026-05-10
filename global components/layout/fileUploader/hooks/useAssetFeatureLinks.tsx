"use client";

import { useCallback, useContext } from "react";

import { FileMetadataContext } from "../context/FileMetadataContext";
import { fileUploaderAssetLookUpContext } from "../context/FileUploaderAssetLookUpContext";

export default function useAssetFeatureLinks() {
  const fileMetaState = useContext(FileMetadataContext);
  const assetLookUpState = useContext(fileUploaderAssetLookUpContext);

  if (!fileMetaState || !assetLookUpState) {
    throw new Error(
      "Asset feature links must be used within FileUploaderProvider",
    );
  }

  const { setAssetMode, setSelectedAssetId, setTargetAsset } = fileMetaState;
  const {
    setAssetLookUpError,
    setAssetReference,
    setLookingUpAsset,
    setSearchedAsset,
  } = assetLookUpState;
  // Lookup and feature-link flows share the same temporary uploader state.
  // Keep one reset function so a completed link/unlink does not leak targetAsset
  // into the next feature input or editor session.
  const resetAssetLinkingState = useCallback(() => {
    setTargetAsset(null);
    setAssetMode(null);
    setSelectedAssetId("");
    setSearchedAsset("");
    setAssetReference(null);
    setAssetLookUpError("");
    setLookingUpAsset(false);
  }, [
    setAssetLookUpError,
    setAssetMode,
    setAssetReference,
    setLookingUpAsset,
    setSearchedAsset,
    setSelectedAssetId,
    setTargetAsset,
  ]);

  return {
    resetAssetLinkingState,
  };
}
