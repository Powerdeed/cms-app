"use client";

import { useContext } from "react";

import {
  FileUploaderErrorContext,
  FileUploaderStateContext,
} from "@global components/layout/file-uploader";

import { uploadFile } from "../services/uploadFile";

export default function useFileUploaderApi() {
  const fileUploaderState = useContext(FileUploaderStateContext);
  const fileUploaderErrors = useContext(FileUploaderErrorContext);

  if (!fileUploaderState || !fileUploaderErrors)
    throw new Error("FileUploaderContext context must be withing a provider.");

  const { file, fileName, setUploadedFile } = fileUploaderState;
  const { setUploadingFile, setErrorUploadingFileMsg } = fileUploaderErrors;

  const fileUploadingHandler = async (
    metadata?: unknown,
    onUploaded?: (url: string) => void,
  ) => {
    if (file) {
      setUploadingFile(true);
      setErrorUploadingFileMsg("");
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);

        if (metadata) {
          formData.append("asset", JSON.stringify(metadata));
        }

        const data = await uploadFile(formData);

        if (data) {
          console.log(data);
          const uploadedUrl =
            data.imageUrl ?? data.url ?? data.storage?.publicUrl ?? "";

          setUploadedFile(uploadedUrl);
          onUploaded?.(uploadedUrl);
        }
      } catch (err) {
        console.error(err);
        if (err instanceof Error) setErrorUploadingFileMsg(err.message);
      } finally {
        setUploadingFile(false);
      }
    }
  };

  return { fileUploadingHandler };
}
