"use client";

import { useContext } from "react";

import { FileUploaderErrorContext } from "@global components/layout/file-uploader";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import { Asset } from "../types/mediaAssets.types";
import useAssetEditing from "./useAssetsEditing";

export default function useAssetsUpload() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const errorContext = useContext(FileUploaderErrorContext);

  if (!mediaAssetsState || !errorContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { setMediaAssets, targetAsset, setTargetAsset, setAssetMode } =
    mediaAssetsState;
  const { setErrorUploadingFile } = errorContext;
  const { handleResetAssetStates } = useAssetEditing();

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

  const handleUpdateTargetAsset = () => {
    if (!targetAsset) return;

    try {
      setMediaAssets((prev) =>
        prev.map((asset) =>
          asset.id === targetAsset.id ? targetAsset : asset,
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
