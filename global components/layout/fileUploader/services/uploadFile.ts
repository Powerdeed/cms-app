import { apiRequest } from "@lib/api/apiRequest";
import { UploadedFile } from "../types/fileUploader.types";

export const uploadFile = async (formData: FormData): Promise<UploadedFile> =>
  await apiRequest({
    method: "POST",
    url: `/upload/single`,
    data: formData,
  });
