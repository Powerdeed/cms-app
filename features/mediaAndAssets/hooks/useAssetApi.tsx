"use client";

import { useContext } from "react";

import {
  Asset,
  DeleteAssetReferenceAction,
  deleteAsset,
  FileUploaderApiContext,
  FileMetadataContext,
} from "@global components/layout/fileUploader";

import { execute } from "@lib/api/execute";
import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";

export default function useAssetApi() {
  const uploaderApiStates = useContext(FileUploaderApiContext);
  const mediaAssetsStates = useContext(MediaAssetsStateContext);
  const fileMetaStates = useContext(FileMetadataContext);

  if (!uploaderApiStates || !mediaAssetsStates || !fileMetaStates)
    throw new Error("Context must be within a provider");

  const { setIsAssetDeleting, setAssetApiOnError } = uploaderApiStates;
  const { setMediaAssets, setShowDeleteOptions } = mediaAssetsStates;
  const { setTargetAsset } = fileMetaStates;

  const handleDeletePopUp = (asset: Asset) => {
    setShowDeleteOptions(true);
    setTargetAsset(asset);
  };

  const handleDeleteAsset = async (
    asset: Asset,
    referenceAction: DeleteAssetReferenceAction = "block",
  ) => {
    await execute(() => deleteAsset(asset.id, referenceAction), {
      setLoading: setIsAssetDeleting,
      setError: setAssetApiOnError,
      onSuccess() {
        setMediaAssets((prev) =>
          prev.filter((currentAsset) => currentAsset.id !== asset.id),
        );
        setShowDeleteOptions(false);
      },
    });
  };

  return { handleDeleteAsset, handleDeletePopUp };
}
