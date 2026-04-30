"use client";

import { useContext } from "react";

import { Asset } from "../types/mediaAssets.types";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { MediaAssetsProcessingContext } from "../context/MediaAssetsProcessingContext";
import { MediaAssetsErrorsContext } from "../context/MediaAssetsErrorsContext";
import useAssetEditing from "./useAssetsEditing";

export default function useAssetsUpload() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const processingContext = useContext(MediaAssetsProcessingContext);
  const errorContext = useContext(MediaAssetsErrorsContext);

  if (!mediaAssetsState || !processingContext || !errorContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { setMediaAssets, currentAsset, setCurrentAsset, file, setAssetMode } =
    mediaAssetsState;

  const { setErrorUploadingFile } = errorContext;

  const { setUploadingStatus } = processingContext;

  const { handleResetAssetStates } = useAssetEditing();

  const handleSubmitMediaAsset = (
    e: React.SubmitEvent<HTMLFormElement>,
    asset: Asset,
  ) => {
    e.preventDefault();
    setUploadingStatus(true);

    try {
      const payload = {
        file,
        metadata: asset,
      };

      console.log("Uploading:", payload);

      // simulate success → add to list
      setMediaAssets((prev) => [...prev, asset]);
    } catch (error) {
      if (error instanceof Error)
        console.error(`An error occurred during upload: ${error.message}`);

      setErrorUploadingFile(true);
      setUploadingStatus(false);
      setAssetMode(null);
    } finally {
      setUploadingStatus(false);
      setAssetMode(null);
      setCurrentAsset(null);
      handleResetAssetStates("cancel");
    }
  };

  const handleUpdateCurrentAsset = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadingStatus(true);

    if (currentAsset)
      try {
        console.log("Uploading:", currentAsset);

        // simulate success → update to list
        setMediaAssets((prev) =>
          prev.map((asset) =>
            asset.id === currentAsset.id ? currentAsset : asset,
          ),
        );
      } catch (error) {
        if (error instanceof Error)
          console.error(`An error occurred during upload: ${error.message}`);

        setErrorUploadingFile(true);
        setUploadingStatus(false);
        setAssetMode(null);
      } finally {
        setUploadingStatus(false);
        setAssetMode(null);
        setCurrentAsset(null);
        handleResetAssetStates("cancel");
      }
  };
  return { handleSubmitMediaAsset, handleUpdateCurrentAsset };
}
