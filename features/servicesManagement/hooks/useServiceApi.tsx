"use client";

// modules
import { useContext, useEffect } from "react";

// hooks
import {
  FileUploaderApiContext,
  useFileUploaderApi,
} from "@global components/layout/fileUploader";
import { serviceContext } from "../context/serviceContext";

// services
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/services";

// types
import { Service } from "../types/services.types";

// constants
import { DEFAULT_SERVICE } from "../constants/defaultService";

// lib
import { execute } from "@lib/api/execute";
import { ApiError } from "@lib/api/utils/apiError";
import { globalContext } from "@globals";

export default function useServiceApi() {
  const serviceStates = useContext(serviceContext);
  const fileUploaderStates = useContext(FileUploaderApiContext);
  const globalState = useContext(globalContext);

  if (!serviceStates || !fileUploaderStates || !globalState)
    throw new Error("Context must be within a provider");

  const { setUnsavedChanges } = globalState;

  const {
    setServices,
    selectedService,
    setSelectedService,
    setSelectedServicePrev,
    setSelectedServiceStatus,
    setIsNewService,
    setIsDeleting,
    setIsUploading,
    setError,
    setFetchServicesError,
  } = serviceStates;

  const { deleteFile } = useFileUploaderApi();

  const resetStates = (reason?: "new") => {
    setSelectedService(reason === "new" ? DEFAULT_SERVICE : null);
    setSelectedServiceStatus(false);
  };

  useEffect(() => {
    const getServicesArr = async () => {
      try {
        const services: Service[] = await getServices();

        setServices(services);
      } catch (error) {
        if (error instanceof ApiError) setFetchServicesError(error.message);
      }
    };

    getServicesArr();
  }, [setError, setServices, setFetchServicesError]);

  const handleAddNewService = () => {
    setIsNewService(true);
    setSelectedService(DEFAULT_SERVICE);
    setSelectedServicePrev(DEFAULT_SERVICE);
  };

  const handleIgnoreNewService = () => {
    setIsNewService(false);
    setSelectedService(null);
    setSelectedServicePrev(null);
  };

  const handleUploadNewService = async () => {
    if (!selectedService) return;

    await execute(
      () => createService({ ...selectedService, _id: crypto.randomUUID() }),
      {
        setLoading: setIsUploading,
        setError,
        onSuccess: (newService) => {
          setServices((prev) => (prev ? [...prev, newService] : prev));
          resetStates("new");
          setSelectedServicePrev(selectedService);
          setUnsavedChanges(false);
        },
      },
    );
  };

  const handleUploadServiceChanges = async () => {
    if (!selectedService) return;

    await execute(
      () =>
        updateService(selectedService._id, {
          ...selectedService,
        }),
      {
        setLoading: setIsUploading,
        setError,
        onSuccess: (updatedService) => {
          setServices((prev) =>
            prev
              ? prev.map((service) =>
                  service._id === selectedService._id
                    ? updatedService
                    : service,
                )
              : prev,
          );

          setSelectedServicePrev(selectedService);
          setUnsavedChanges(false);
        },
      },
    );
  };

  const handleDeleteService = async () => {
    if (!selectedService) return;

    await execute(() => deleteService(selectedService._id), {
      setLoading: setIsDeleting,
      setError,
      onSuccess: () => {
        setServices((prev) =>
          prev
            ? prev?.filter((service) => service._id !== selectedService._id)
            : prev,
        );

        resetStates();
        setSelectedServicePrev(selectedService);
        setUnsavedChanges(false);
      },
    });
  };

  const handleDeleteImage = async (imageId: string) => {
    await deleteFile(imageId, () =>
      setSelectedService((prev) => {
        if (!prev) return prev;
        const images = prev.images;

        const newArr = images.filter((img) => img[0] !== imageId);

        return { ...prev, images: newArr };
      }),
    );
  };

  return {
    handleAddNewService,
    handleIgnoreNewService,
    handleUploadNewService,
    handleUploadServiceChanges,
    handleDeleteService,
    handleDeleteImage,
  };
}
