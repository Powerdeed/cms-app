"use client";

import { useContext, useEffect } from "react";
import { isEqual } from "lodash";

import { serviceContext } from "../context/serviceContext";
import { Service } from "../types/services.types";
import {
  Asset,
  addAssetLink,
  FileMetadataContext,
  renameAssetLink,
  useAssetFeatureLinks,
} from "@global components/layout/fileUploader";
import { globalContext } from "@globals";

export default function useServiceEdit() {
  const sContext = useContext(serviceContext);
  const globalState = useContext(globalContext);
  const FileMetadataStates = useContext(FileMetadataContext);
  const { resetAssetLinkingState } = useAssetFeatureLinks();

  if (!sContext || !FileMetadataStates || !globalState)
    throw new Error("Context must be within a provider");

  const {
    selectedService,
    setSelectedService,
    selectedServiceStatus,
    selectedServicePrev,
    setHasServiceChanged,
  } = sContext;

  const { setUnsavedChanges } = globalState;

  const selectValue = (field: Exclude<keyof Service, "status" | "_id">) => {
    if (!selectedService) return;
    return selectedService[field];
  };

  const modifyService = (
    field: Exclude<keyof Service, "status" | "_id">,
    value: string,
  ) =>
    setSelectedService((prev) => {
      if (!prev) return prev;

      return { ...prev, [field]: value };
    });

  useEffect(() => {
    setSelectedService((prev) => {
      if (!prev) return prev;

      return { ...prev, status: selectedServiceStatus };
    });
  }, [selectedServiceStatus, setSelectedService]);

  const addImageLinkToService = (asset: Asset) => {
    setSelectedService((prev) => {
      if (!prev) return prev;

      return { ...prev, images: addAssetLink(prev.images, asset) };
    });

    resetAssetLinkingState();
  };

  // Existing assets are already saved. Linking only updates the service draft;
  // the backend rebuilds asset.references when the service is saved.
  const linkExistingServiceImage = () => {
    if (!FileMetadataStates.targetAsset) return;

    addImageLinkToService(FileMetadataStates.targetAsset);
  };

  // Newly uploaded files return as assets first, then use the same link path as
  // existing files so feature state stays easy to reason about.
  const linkUploadedServiceImage = (asset: Asset) => {
    addImageLinkToService(asset);
  };

  const updateServiceImageRef = (asset: Asset) =>
    setSelectedService((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        images: renameAssetLink(prev.images, asset),
      };
    });

  useEffect(() => {
    const hasServiceChanged = !isEqual(selectedService, selectedServicePrev);

    setHasServiceChanged(hasServiceChanged);
    setUnsavedChanges(hasServiceChanged);
  }, [
    selectedService,
    selectedServicePrev,
    setHasServiceChanged,
    setUnsavedChanges,
  ]);

  return {
    selectValue,
    modifyService,
    linkExistingServiceImage,
    linkUploadedServiceImage,
    updateServiceImageRef,
  };
}
