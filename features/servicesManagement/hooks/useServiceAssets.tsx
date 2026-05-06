"use client";

// modules
import { useContext, useEffect, useRef } from "react";

// hooks
import { serviceContext } from "../context/serviceContext";
import useServiceEdit from "./useServiceEdit";

// components
import {
  AssetRef,
  getAsset,
  deleteAsset,
  useFileUploaderPaths,
  useFileUploaderCreation,
  FileMetadataContext,
  FileUploaderStateContext,
  FileUploaderApiContext,
  deleteAssets,
} from "@global components/layout/fileUploader";

// lib
import { execute } from "@lib/api/execute";

export default function useServiceAssets() {
  const serviceState = useContext(serviceContext);
  const fileState = useContext(FileMetadataContext);
  const uploaderState = useContext(FileUploaderStateContext);
  const assetMetaState = useContext(FileMetadataContext);
  const fileUploaderStates = useContext(FileUploaderApiContext);

  if (
    !serviceState ||
    !fileState ||
    !uploaderState ||
    !assetMetaState ||
    !fileUploaderStates
  )
    throw new Error("Context must be within a provider");

  const { selectedService } = serviceState;
  const { setAssetMode } = fileState;
  const { setAssetRef, setDefaultIsPublic, setTargetFileTypes } = uploaderState;
  const { selectedAssetId } = assetMetaState;
  const { setIsAssetDeleting, setAssetApiOnError } = fileUploaderStates;
  const { handleTargetAsset } = useFileUploaderCreation();
  const { addNewServiceImage } = useServiceEdit();
  const { pathSetter, updatePathSetters } = useFileUploaderPaths();

  const addServiceImageRef = useRef(addNewServiceImage);
  const hasSelectedService = Boolean(selectedService);
  const selectedServiceName = selectedService?.name ?? "";

  useEffect(() => {
    addServiceImageRef.current = addNewServiceImage;
  }, [addNewServiceImage]);

  // Update asset states
  useEffect(() => {
    if (!hasSelectedService) return;

    const uploadPath = `services/${selectedServiceName}`;

    setTargetFileTypes(["image"]);
    setDefaultIsPublic(true);
    setAssetRef(() => (val: AssetRef) => addServiceImageRef.current(val));
    pathSetter(uploadPath);
    updatePathSetters(undefined, uploadPath);
    setAssetMode("new");
  }, [
    hasSelectedService,
    selectedServiceName,
    pathSetter,
    setAssetMode,
    setAssetRef,
    setDefaultIsPublic,
    setTargetFileTypes,
    updatePathSetters,
  ]);

  // Load selected asset
  useEffect(() => {
    if (!selectedAssetId) return;

    const loadSelectedAsset = async () => {
      try {
        const asset = await getAsset(selectedAssetId);
        handleTargetAsset("existing", asset);
      } catch (error) {
        console.error(error);
      }
    };

    loadSelectedAsset();
  }, [handleTargetAsset, selectedAssetId]);

  // Delete Asset
  const deleteFile = async (assetId: string, onSuccess: () => void) =>
    await execute(() => deleteAsset(assetId), {
      setLoading: setIsAssetDeleting,
      setError: setAssetApiOnError,
      onSuccess,
    });

  // Delete Asset
  const deleteFiles = async (assetIds: string[]) =>
    await execute(() => deleteAssets(assetIds), {
      setLoading: setIsAssetDeleting,
      setError: setAssetApiOnError,
    });

  return { deleteFile, deleteFiles };
}
