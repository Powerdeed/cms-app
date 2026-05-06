"use client";

import { useContext } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderErrorContext } from "../context/FileUploaderErrorContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";
import { FileUploaderApiContext } from "../context/FileUploaderApiContext";

export default function useFileUploaderState() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const errorContext = useContext(FileUploaderErrorContext);
  const apiStates = useContext(FileUploaderApiContext);

  if (
    !fileMetadataState ||
    !fileUploaderState ||
    !processingContext ||
    !errorContext ||
    !apiStates
  ) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  return {
    ...fileUploaderState,
    ...processingContext,
    ...errorContext,
    ...fileMetadataState,
    ...apiStates,
  };
}
