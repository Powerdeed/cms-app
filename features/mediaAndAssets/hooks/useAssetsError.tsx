"use client";

import { useContext } from "react";
import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";
import {
  FileUploaderErrorContext,
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/file-uploader";

export default function useAssetsError() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const errorContext = useContext(FileUploaderErrorContext);

  if (
    !mediaAssetsState ||
    !fileUploaderState ||
    !processingContext ||
    !errorContext
  ) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { assetMode } = mediaAssetsState;
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

  const message = `Only: ${supportedTypes} are supported`;

  const errorMsg =
    !isSupportedFile && isSupportedFile !== null
      ? message
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
  };

  const resetErrors = () => {
    setErrorProcessingFile(false);
    setErrorUploadingFile(false);
    setIsSupportedFile(null);
  };

  return { hasError, errorMsg, popUpToDisplay, resetErrors, supportedTypes };
}
