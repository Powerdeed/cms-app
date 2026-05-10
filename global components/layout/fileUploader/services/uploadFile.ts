import axios from "axios";
import { apiRequest } from "@lib/api/apiRequest";
import { api } from "@lib/api/axios";
import { ApiError } from "@lib/api/utils/apiError";
import { UploadedFile } from "../types/fileUploader.types";
import { Asset, DeleteAssetReferenceAction } from "../types/asset.types";

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

export const uploadFiles = async (
  formData: FormData,
): Promise<UploadedFile[]> =>
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

export const deleteAsset = async (
  id: string,
  referenceAction: DeleteAssetReferenceAction = "block",
): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/upload/single/${id}`,
    params: { referenceAction },
  });

const getDownloadFileName = (contentDisposition?: string) => {
  if (!contentDisposition) return "";

  const utf8FileName = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  const quotedFileName = contentDisposition.match(/filename="([^"]+)"/i);
  const rawFileName = utf8FileName?.[1] ?? quotedFileName?.[1] ?? "";

  return rawFileName ? decodeURIComponent(rawFileName) : "";
};

export const downloadAsset = async (asset: Asset) => {
  try {
    const response = await api.get<Blob>(
      `/upload/single/${asset.id}/download`,
      {
        responseType: "blob",
      },
    );

    return {
      blob: response.data,
      fileName:
        getDownloadFileName(response.headers["content-disposition"]) ||
        asset.name ||
        asset.originalName,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.data?.message || "Download failed",
        error.response?.status || 500,
        error.response?.data,
      );
    }

    throw error;
  }
};
