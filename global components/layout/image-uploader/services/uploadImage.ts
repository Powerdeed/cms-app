import { apiRequest } from "@lib/api/apiRequest";
import { ImageFile } from "../types/imageFile";

export const uploadImage = async (
  data: FormData,
): Promise<ImageFile> =>
  await apiRequest({
    method: "POST",
    url: `/upload/single`,
    data,
  });
