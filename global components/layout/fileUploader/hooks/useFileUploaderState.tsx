"use client";

import { useContext } from "react";
import { globalContext } from "@globals";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderErrorContext } from "../context/FileUploaderErrorContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";

export default function useFileUploaderState() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const errorContext = useContext(FileUploaderErrorContext);
  const globalStates = useContext(globalContext);

  if (
    !fileMetadataState ||
    !fileUploaderState ||
    !processingContext ||
    !errorContext ||
    !globalStates
  ) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  return {
    ...fileUploaderState,
    ...processingContext,
    ...errorContext,
    ...fileMetadataState,
  };
}
