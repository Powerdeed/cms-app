"use client";

import { useContext } from "react";
import {
  FileMetadataContext,
  FileUploaderProcessingContext,
  useFileMetadataEditing,
} from "@global components/layout/fileUploader";
import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { Asset } from "@global components/layout/fileUploader";

export default function useAssetsUpload() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const fileMetadataState = useContext(FileMetadataContext);
  const processingContext = useContext(FileUploaderProcessingContext);

  if (!mediaAssetsState || !fileMetadataState || !processingContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { setMediaAssets } = mediaAssetsState;
  const { targetAsset, setTargetAsset, setAssetMode } = fileMetadataState;
  const { setErrorUploadingFile } = processingContext;
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
