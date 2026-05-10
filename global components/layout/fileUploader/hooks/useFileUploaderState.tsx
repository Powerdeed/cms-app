"use client";

import { useContext } from "react";
import { FileMetadataContext } from "../context/FileMetadataContext";
import { FileUploaderProcessingContext } from "../context/FileUploaderProcessingContext";
import { FileUploaderStateContext } from "../context/FileUploaderStateContext";
import { FileUploaderApiContext } from "../context/FileUploaderApiContext";
import { fileUploaderAssetLookUpContext } from "../context/FileUploaderAssetLookUpContext";

export default function useFileUploaderState() {
  const fileMetadataState = useContext(FileMetadataContext);
  const fileUploaderState = useContext(FileUploaderStateContext);
  const processingContext = useContext(FileUploaderProcessingContext);
  const assetLookUp = useContext(fileUploaderAssetLookUpContext);
  const apiStates = useContext(FileUploaderApiContext);

  if (
    !fileMetadataState ||
    !fileUploaderState ||
    !processingContext ||
    !assetLookUp ||
    !apiStates
  ) {
    throw new Error("File metadata must be used within FileUploaderProvider");
  }

  return {
    ...fileUploaderState,
    ...processingContext,
    ...fileMetadataState,
    ...assetLookUp,
    ...apiStates,
  };
}
