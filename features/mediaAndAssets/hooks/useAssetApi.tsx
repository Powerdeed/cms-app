"use client";

import { useContext } from "react";

import {
  Asset,
  DeleteAssetReferenceAction,
  deleteAsset,
  downloadAsset,
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

  const { setAssetApiOnError } = uploaderApiStates;
  const {
    setAllMediaAssets,
    setMediaAssets,
    setShowDeleteOptions,
    setDeletingAssetIds,
    setDownloadingAssetIds,
  } = mediaAssetsStates;
  const { setTargetAsset } = fileMetaStates;

  const handleDeletePopUp = (asset: Asset) => {
    setShowDeleteOptions(true);
    setTargetAsset(asset);
  };

  const updateActiveAssetIds = (
    id: string,
    isLoading: boolean,
    setIds: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setIds((prev) => {
      return isLoading
        ? prev.includes(id)
          ? prev
          : [...prev, id]
        : prev.filter((activeId) => activeId !== id);
    });
  };

  const handleDeleteAsset = async (
    asset: Asset,
    referenceAction: DeleteAssetReferenceAction = "block",
  ) => {
    await execute(() => deleteAsset(asset.id, referenceAction), {
      setLoading: (loading) => {
        const isLoading =
          typeof loading === "function" ? loading(false) : loading;

        updateActiveAssetIds(
          asset.id,
          isLoading,
          setDeletingAssetIds,
        );
      },
      setError: setAssetApiOnError,
      onSuccess() {
        setAllMediaAssets((prev) =>
          prev.filter((currentAsset) => currentAsset.id !== asset.id),
        );
        setMediaAssets((prev) =>
          prev.filter((currentAsset) => currentAsset.id !== asset.id),
        );
        setShowDeleteOptions(false);
      },
    });
  };

  const saveBlobToDownloads = ({
    blob,
    fileName,
  }: {
    blob: Blob;
    fileName: string;
  }) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAsset = async (asset: Asset) => {
    await execute(() => downloadAsset(asset), {
      setLoading: (loading) => {
        const isLoading =
          typeof loading === "function" ? loading(false) : loading;

        updateActiveAssetIds(
          asset.id,
          isLoading,
          setDownloadingAssetIds,
        );
      },
      setError: setAssetApiOnError,
      onSuccess: saveBlobToDownloads,
    });
  };

  return { handleDeleteAsset, handleDeletePopUp, handleDownloadAsset };
}
