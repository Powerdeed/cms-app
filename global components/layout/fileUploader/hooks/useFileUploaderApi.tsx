"use client";

import { useContext } from "react";

import {
  Asset,
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
  classification: asset.classification,
  display: asset.display,
  relationships: asset.relationships,
  status: asset.status,
  isPublic: asset.isPublic,
  updatedBy: asset.updatedBy,
  updatedAt: new Date().toISOString(),
});

export default function useFileUploaderApi() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const fileUploaderProcessing = useContext(FileUploaderProcessingContext);
  const fileUploaderErrors = useContext(FileUploaderErrorContext);
  const fileUploaderApi = useContext(FileUploaderApiContext);
  const globalStates = useContext(globalContext);

  if (
    !fileMetadataState ||
    !fileUploaderState ||
    !fileUploaderProcessing ||
    !fileUploaderErrors ||
    !globalStates ||
    !fileUploaderApi
  )
    throw new Error("FileUploaderContext context must be withing a provider.");

  const { file, fileName, setUploadedFile, assetRef } = fileUploaderState;
  const { setUploadingStatus } = fileUploaderProcessing;
  const { setUploadingFile, setErrorUploadingFileMsg } = fileUploaderErrors;
  const { setIsAssetUploading, setAssetApiOnError } = fileUploaderApi;
  const { targetAsset, setTargetAsset } = fileMetadataState;
  const { setUnsavedChanges } = globalStates;

  const { handleResetAssetStates } = useFileUploaderEditing();

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

  const updateAssetHandler = async () => {
    if (!targetAsset) return;

    const payload = buildAssetUpdatePayload(targetAsset);

    return await execute(() => updateAsset(targetAsset.id, payload), {
      setLoading: setIsAssetUploading,
      setError: setAssetApiOnError,
      onSuccess: (updatedAsset: Asset) => setTargetAsset(updatedAsset),
    });
  };

  return { fileUploadingHandler, uploadFileAndSetStates, updateAssetHandler };
}
