"use client";

import { useContext, useEffect } from "react";
import { isEqual } from "lodash";

import { serviceContext } from "../context/serviceContext";
import { Service } from "../types/services.types";
import {
  AssetRef,
  FileMetadataContext,
} from "@global components/layout/fileUploader";
import { globalContext } from "@globals";

export default function useServiceEdit() {
  const sContext = useContext(serviceContext);
  const globalState = useContext(globalContext);
  const FileMetadataStates = useContext(FileMetadataContext);

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

  const addNewServiceImage = (image: AssetRef) =>
    setSelectedService((prev) => {
      if (!prev) return prev;

      return { ...prev, images: [...prev.images, image] };
    });

  useEffect(() => {
    setHasServiceChanged(!isEqual(selectedService, selectedServicePrev));
    setUnsavedChanges(isEqual(selectedService, selectedServicePrev));
  }, [
    selectedService,
    selectedServicePrev,
    setHasServiceChanged,
    setUnsavedChanges,
  ]);

  return {
    selectValue,
    modifyService,
    addNewServiceImage,
  };
}
