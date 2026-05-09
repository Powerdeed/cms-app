"use client";

import { useContext } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderErrorContext } from "../context/FileUploaderErrorContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";

export default function useFileUploaderError() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const errorContext = useContext(FileUploaderErrorContext);

  if (
    !fileMetadataState ||
    !fileUploaderState ||
    !processingContext ||
    !errorContext
  ) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  const { assetMode } = fileMetadataState;
  const { file, targetFileTypes } = fileUploaderState;
  const { compressing, isSupportedFile, setIsSupportedFile } =
    processingContext;
  const {
    errorProcessingFile,
    setErrorProcessingFile,
    errorUploadingFile,
    setErrorUploadingFile,
  } = errorContext;

  const hasError =
    (!isSupportedFile && isSupportedFile !== null) ||
    errorProcessingFile ||
    errorUploadingFile;

  const supportedTypes = [
    targetFileTypes.includes("image") && [
      '".jpg"',
      '".jpeg"',
      '".png"',
      '".gif"',
      '".bmp"',
      '".webp"',
      '".avif"',
    ],
    targetFileTypes.includes("document") && [
      '".pdf"',
      '".docx"',
      '".doc"',
      '".csv"',
    ],
    targetFileTypes.includes("diagram") && ['".svg"'],
  ]
    .filter(Boolean)
    .flat()
    .join(", ");

  const errorMsg =
    !isSupportedFile && isSupportedFile !== null
      ? `Only: ${supportedTypes} are supported`
      : errorProcessingFile
        ? `Error processing file: try reselecting the file again.`
        : errorUploadingFile
          ? "Upload failed. Please try again."
          : "";

  const popUpToDisplay = {
    dropZone: !file && assetMode === "new" && !compressing && !hasError,
    compressing: file && compressing && !hasError,
    assetMediaEditor:
      (file || (!file && assetMode === "existing")) &&
      !compressing &&
      !hasError,
    assetHandlingError: hasError,
    assetDelete: true,
  };

  const resetErrors = () => {
    setErrorProcessingFile(false);
    setErrorUploadingFile(false);
    setIsSupportedFile(null);
  };

  return { hasError, errorMsg, popUpToDisplay, resetErrors, supportedTypes };
}
