"use client";

import useFilePaths from "./useFilePaths";
import useFileHandlers from "./useFileHandlers";
import useFileUploaderApi from "./useFileApi";
import { useContext } from "react";
import {
  FileUploaderErrorContext,
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/file-uploader";

export default function useFileUploader() {
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const errorContext = useContext(FileUploaderErrorContext);
  const paths = useFilePaths();
  const handlers = useFileHandlers();
  const api = useFileUploaderApi();

  if (!fileUploaderState || !processingContext || !errorContext) {
    throw new Error("FileUploaderContext context must be withing a provider.");
  }

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
    dropZone: !file && !compressing && !hasError,
    compressing: file && compressing && !hasError,
    assetMediaEditor: file && !compressing && !hasError,
    assetHandlingError: hasError,
  };

  const resetFileUploader = () => {
    fileUploaderState.setFile(null);
    fileUploaderState.setFileName("");
    setErrorProcessingFile(false);
    setErrorUploadingFile(false);
    setIsSupportedFile(null);
  };

  return {
    fileUploaderActions: {
      hasError,
      errorMsg,
      popUpToDisplay,
      resetFileUploader,
      supportedTypes,
      ...paths,
      ...handlers,
      ...api,
    },
  };
}
