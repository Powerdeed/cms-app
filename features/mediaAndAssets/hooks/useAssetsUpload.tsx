"use client";

import { useContext } from "react";
import {
  FileMetadataContext,
  FileUploaderErrorContext,
  useFileMetadataEditing,
} from "@global components/layout/fileUploader";
import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { Asset } from "@global components/layout/fileUploader";

export default function useAssetsUpload() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const fileMetadataState = useContext(FileMetadataContext);
  const errorContext = useContext(FileUploaderErrorContext);

  if (!mediaAssetsState || !fileMetadataState || !errorContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { setMediaAssets } = mediaAssetsState;
  const { targetAsset, setTargetAsset, setAssetMode } = fileMetadataState;
  const { setErrorUploadingFile } = errorContext;
  const { handleResetAssetStates } = useFileMetadataEditing();

  const handleSubmitMediaAsset = (asset: Asset) => {
    try {
      setMediaAssets((prev) => [...prev, asset]);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`An error occurred during upload: ${error.message}`);
      }

      setErrorUploadingFile(true);
      setAssetMode(null);
    } finally {
      setAssetMode(null);
      setTargetAsset(null);
      handleResetAssetStates("cancel");
    }
  };

  const handleUpdateTargetAsset = (asset = targetAsset) => {
    if (!asset) return;

    try {
      setMediaAssets((prev) =>
        prev.map((currentAsset) =>
          currentAsset.id === asset.id ? asset : currentAsset,
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`An error occurred during upload: ${error.message}`);
      }

      setErrorUploadingFile(true);
      setAssetMode(null);
    } finally {
      setAssetMode(null);
      setTargetAsset(null);
      handleResetAssetStates("cancel");
    }
  };

  return { handleSubmitMediaAsset, handleUpdateTargetAsset };
}
