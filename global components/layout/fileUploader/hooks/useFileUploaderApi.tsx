"use client";

import { useContext } from "react";

import {
  Asset,
  DeleteAssetReferenceAction,
  deleteAsset,
  deleteAssets,
  FileMetadataContext,
  FileUploaderApiContext,
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/fileUploader";

import { updateAsset, uploadFile } from "../services/uploadFile";
import useFileUploaderEditing from "./useFileUploaderEditing";
import { globalContext } from "@globals";
import { execute } from "@lib/api/execute";
import { normalizeExistingAsset } from "../utils/normalizeExistingAsset";

const buildAssetUpdatePayload = (asset: Asset): Partial<Asset> => ({
  name: asset.name,
  originalName: asset.originalName,
  tags: asset.tags,
  storage: asset.storage,
  display: asset.display,
  status: asset.status,
  isPublic: asset.isPublic,
  updatedBy: asset.updatedBy,
  updatedAt: new Date().toISOString(),
});

export default function useFileUploaderApi() {
  const fileMetaState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const fileUploaderProcessing = useContext(FileUploaderProcessingContext);
  const globalStates = useContext(globalContext);
  const fileUploaderApiStates = useContext(FileUploaderApiContext);

  if (
    !fileMetaState ||
    !fileUploaderState ||
    !fileUploaderProcessing ||
    !globalStates ||
    !fileUploaderApiStates
  )
    throw new Error("FileUploaderContext context must be withing a provider.");

  const {
    setIsAssetDeleting,
    setIsAssetUploading,
    setIsAssetUpdating,
    setAssetApiOnError,
  } = fileUploaderApiStates;
  const { file, fileName } = fileUploaderState;
  const { setErrorUploadingFileMsg } = fileUploaderProcessing;
  const { targetAsset, setTargetAsset } = fileMetaState;
  const { setUnsavedChanges } = globalStates;

  const { handleResetAssetStates } = useFileUploaderEditing();

  // Upload new asset
  const uploadFileAndSetStates = async (
    e: React.SubmitEvent<HTMLFormElement>,
    onAssetUploaded?: (asset: Asset) => void,
  ) => {
    e.preventDefault();
    const uploadedAsset = await fileUploadingHandler();

    if (uploadedAsset) {
      onAssetUploaded?.(uploadedAsset);
      handleResetAssetStates("re-upload");
      setUnsavedChanges(false);
    }
  };

  // Uploads the currently selected local file and returns the saved asset.
  // Callers decide what to do with that asset: Media & Assets stores it in the
  // asset list, while feature editors link it to their local draft data.
  const fileUploadingHandler = async () => {
    if (!file) return;

    setErrorUploadingFileMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    if (targetAsset) {
      formData.append("asset", JSON.stringify(targetAsset));
    }

    const uploadedAsset = await execute(() => uploadFile(formData), {
      setLoading: setIsAssetUploading,
      setError: setErrorUploadingFileMsg,
    });

    if (!uploadedAsset) return;

    const normalizedAsset = normalizeExistingAsset(uploadedAsset);
    setTargetAsset(normalizedAsset);

    return normalizedAsset;
  };

  // One submit handler for both asset editor modes:
  // - "new" uploads the file and returns the created asset.
  // - "existing" only updates metadata on the existing asset.
  const updateAssetMeta = async (
    e: React.SubmitEvent<HTMLFormElement>,
    onAssetUploaded?: (asset: Asset) => void,
    onAssetUpdated?: (asset: Asset) => void,
  ) => {
    e.preventDefault();
    if (!targetAsset) return;

    if (fileMetaState.assetMode === "new") {
      await execute(() => fileUploadingHandler(), {
        setLoading: setIsAssetUploading,
        setError: setAssetApiOnError,
        onSuccess: (uploadedAsset) => {
          if (uploadedAsset) {
            onAssetUploaded?.(uploadedAsset);
          }
        },
      });

      return;
    }

    if (fileMetaState.assetMode === "existing") {
      const payload = buildAssetUpdatePayload(targetAsset);

      await execute(() => updateAsset(targetAsset.id, payload), {
        setLoading: setIsAssetUpdating,
        setError: setAssetApiOnError,
        onSuccess: (updatedAsset) => {
          if (updatedAsset) {
            const normalizedAsset = normalizeExistingAsset(updatedAsset);

            setTargetAsset(normalizedAsset);

            onAssetUpdated?.(normalizedAsset);
          }
        },
      });

      return;
    }
  };

  // Delete asset
  const deleteFile = async (
    assetId: string,
    onSuccess: () => void,
    referenceAction: DeleteAssetReferenceAction = "block",
  ) =>
    await execute(() => deleteAsset(assetId, referenceAction), {
      setLoading: setIsAssetDeleting,
      setError: setAssetApiOnError,
      onSuccess,
    });

  // Delete multiple assets
  const deleteFiles = async (assetIds: string[]) =>
    await execute(() => deleteAssets(assetIds), {
      setLoading: setIsAssetDeleting,
      setError: setAssetApiOnError,
    });

  return {
    uploadFileAndSetStates,
    fileUploadingHandler,
    deleteFile,
    deleteFiles,
    updateAssetMeta,
  };
}
