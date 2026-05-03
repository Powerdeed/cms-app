"use client";

import { useContext } from "react";

import {
  FileMetadataContext,
  FileUploaderErrorContext,
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/fileUploader";

import { uploadFile } from "../services/uploadFile";

export default function useFileUploaderApi() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const fileUploaderProcessing = useContext(FileUploaderProcessingContext);
  const fileUploaderErrors = useContext(FileUploaderErrorContext);

  if (
    !fileMetadataState ||
    !fileUploaderState ||
    !fileUploaderProcessing ||
    !fileUploaderErrors
  )
    throw new Error("FileUploaderContext context must be withing a provider.");

  const { file, fileName, setUploadedFile } = fileUploaderState;
  const { setUploadingStatus } = fileUploaderProcessing;
  const { setUploadingFile, setErrorUploadingFileMsg } = fileUploaderErrors;
  const { targetAsset } = fileMetadataState;

  const fileUploadingHandler = async () => {
    if (file) {
      setUploadingFile(true);
      setUploadingStatus(true);
      setErrorUploadingFileMsg("");
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);

        if (targetAsset) {
          formData.append("asset", JSON.stringify(targetAsset));
        }

        const data = await uploadFile(formData);

        if (data) {
          console.log(data);
          const uploadedUrl =
            data.imageUrl ?? data.url ?? data.storage?.publicUrl ?? "";

          setUploadedFile(uploadedUrl);
          return data;
        }
      } catch (err) {
        console.error(err);
        if (err instanceof Error) setErrorUploadingFileMsg(err.message);
      } finally {
        setUploadingFile(false);
        setUploadingStatus(false);
      }
    }
  };

  return { fileUploadingHandler };
}
