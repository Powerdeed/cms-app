import { apiRequest } from "@lib/api/apiRequest";
import { UploadedFile } from "../types/fileUploader.types";
import { Asset } from "../types/asset.types";

export const getAssets = async (): Promise<Asset[]> =>
  await apiRequest({
    method: "GET",
    url: `/assets`,
  });

export const getAsset = async (id: string): Promise<Asset> =>
  await apiRequest({
    method: "GET",
    url: `/assets/${id}`,
  });

export const uploadFiles = async (formData: FormData): Promise<UploadedFile[]> =>
  await apiRequest({
    method: "POST",
    url: `/upload/multiple`,
    data: formData,
  });


export const uploadFile = async (formData: FormData): Promise<UploadedFile> =>
  await apiRequest({
    method: "POST",
    url: `/upload/single`,
    data: formData,
  });

export const updateAsset = async (
  id: string,
  data: Partial<Asset>,
): Promise<Asset> =>
  await apiRequest({
    method: "PUT",
    url: `/assets/${id}`,
    data,
  });

export const deleteAssets = async (ids: string[]): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/upload/multiple`,
    data: { ids },
  });
  
export const deleteAsset = async (id: string): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/upload/single/${id}`,
  });
