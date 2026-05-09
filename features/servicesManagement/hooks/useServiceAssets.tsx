"use client";

// modules
import { useContext, useEffect, useRef } from "react";

// hooks
import { serviceContext } from "../context/serviceContext";
import useServiceEdit from "./useServiceEdit";

// components
import {
  AssetRef,
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
  const { setAssetRef, setDefaultIsPublic, setTargetFileTypes } = uploaderState;
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

  return {};
}
