"use client";

import { useContext } from "react";

import {
  // states
  Asset,
  DeleteAssetReferenceAction,
  deleteAsset,
  deleteAssets,
  FileMetadataContext,
  FileUploaderApiContext,
  FileUploaderErrorContext,
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/fileUploader";

import { updateAsset, uploadFile } from "../services/uploadFile";
import useFileUploaderEditing from "./useFileUploaderEditing";
import { globalContext } from "@globals";
import { execute } from "@lib/api/execute";

const buildAssetUpdatePayload = (asset: Asset): Partial<Asset> => ({
  name: asset.name,
  originalName: asset.originalName,
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
  const fileUploaderErrors = useContext(FileUploaderErrorContext);
  const globalStates = useContext(globalContext);
  const fileUploaderApiStates = useContext(FileUploaderApiContext);

  if (
    !fileMetaState ||
    !fileUploaderState ||
    !fileUploaderProcessing ||
    !fileUploaderErrors ||
    !globalStates ||
    !fileUploaderApiStates
  )
    throw new Error("FileUploaderContext context must be withing a provider.");

  const { setIsAssetDeleting, setIsAssetUploading, setAssetApiOnError } =
    fileUploaderApiStates;
  const { file, fileName, setUploadedFile, assetRef } = fileUploaderState;
  const { setUploadingStatus } = fileUploaderProcessing;
  const { setUploadingFile, setErrorUploadingFileMsg } = fileUploaderErrors;
  const { targetAsset, setTargetAsset, assetMode } = fileMetaState;
  const { setUnsavedChanges } = globalStates;

  const { handleResetAssetStates } = useFileUploaderEditing();

  // Upload new asset
  const uploadFileAndSetStates = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const uploadedAsset = await fileUploadingHandler();
    const assetId = uploadedAsset?.id ?? targetAsset?.id;
    const name = uploadedAsset?.name ?? targetAsset?.name ?? fileName;

    if (assetId && fileName) {
      assetRef?.([assetId, name]);
    }

    handleResetAssetStates("re-upload");
    setUnsavedChanges(false);
  };

  const fileUploadingHandler = async () => {
    if (file) {
      setUploadingFile(true);
      setUploadingStatus(true);
      setErrorUploadingFileMsg("");
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);

        if (targetAsset) {
          formData.append("asset", JSON.stringify(targetAsset));
        }

        const data = await uploadFile(formData);

        if (data) {
          console.log(data);
          const uploadedUrl =
            data.imageUrl ?? data.url ?? data.storage?.publicUrl ?? "";

          setUploadedFile(uploadedUrl);
          return data;
        }
      } catch (err) {
        console.error(err);
        if (err instanceof Error) setErrorUploadingFileMsg(err.message);
      } finally {
        setUploadingFile(false);
        setUploadingStatus(false);
      }
    }
  };

  // Update existing asset meta
  const updateAssetMeta = async (
    e: React.SubmitEvent<HTMLFormElement>,
    onAssetUploaded?: (asset: Asset) => void,
    onAssetUpdated?: (asset: Asset) => void,
  ) => {
    e.preventDefault();

    if (assetMode === "new") {
      const uploadedAsset = await fileUploadingHandler();

      if (uploadedAsset?.id && uploadedAsset.name) {
        onAssetUploaded?.(uploadedAsset as Asset);
      }
      return;
    }

    if (assetMode === "existing") {
      const updatedAsset = await updateAssetHandler();

      if (updatedAsset) {
        onAssetUpdated?.(updatedAsset);
      }
    }
  };

  const updateAssetHandler = async () => {
    if (!targetAsset) return;

    const payload = buildAssetUpdatePayload(targetAsset);

    return await execute(() => updateAsset(targetAsset.id, payload), {
      setLoading: setIsAssetUploading,
      setError: setAssetApiOnError,
      onSuccess: (updatedAsset: Asset) => setTargetAsset(updatedAsset),
    });
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
    fileUploadingHandler,
    uploadFileAndSetStates,
    updateAssetHandler,
    deleteFile,
    deleteFiles,
    updateAssetMeta,
  };
}
