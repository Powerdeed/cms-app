"use client";

// modules
import { useContext, useEffect } from "react";

// hooks
import { serviceContext } from "../context/serviceContext";

// components
import {
  useFileUploaderPaths,
  FileMetadataContext,
  FileUploaderStateContext,
} from "@global components/layout/fileUploader";

export default function useServiceAssets() {
  const serviceState = useContext(serviceContext);
  const fileState = useContext(FileMetadataContext);
  const uploaderState = useContext(FileUploaderStateContext);

  if (!serviceState || !fileState || !uploaderState)
    throw new Error("Context must be within a provider");

  const { selectedService } = serviceState;
  const { setAssetMode } = fileState;
  const { setDefaultIsPublic, setTargetFileTypes } = uploaderState;
  const { pathSetter, updatePathSetters } = useFileUploaderPaths();

  const hasSelectedService = Boolean(selectedService);
  const selectedServiceName = selectedService?.name ?? "";

  // Keep feature upload defaults ready, but do not open the uploader here.
  // The editor chooses between "existing" and "new" explicitly.
  useEffect(() => {
    if (!hasSelectedService) return;

    const uploadPath = `services/${selectedServiceName}`;

    setTargetFileTypes(["image"]);
    setDefaultIsPublic(true);
    pathSetter(uploadPath);
    updatePathSetters(undefined, uploadPath);
    setAssetMode(null);
  }, [
    hasSelectedService,
    selectedServiceName,
    pathSetter,
    setAssetMode,
    setDefaultIsPublic,
    setTargetFileTypes,
    updatePathSetters,
  ]);

  return {};
}
