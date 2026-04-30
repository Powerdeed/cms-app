"use client";

import { useContext, useMemo } from "react";

import { MediaAssetsStateContext } from "../context/MediaAssetsStateContext";

import { MediaAssetsProcessingContext } from "../context/MediaAssetsProcessingContext";
import { MediaAssetsErrorsContext } from "../context/MediaAssetsErrorsContext";
import { MediaAssetsSearchContext } from "../context/MediaAssetsSearchContext";

import {
  getCurrentDateFormatted,
  mediaType,
  sizeOfFile,
} from "../utils/conversions";

import { Asset } from "../types/mediaAssets.types";

export default function useAssetsState() {
  const mediaAssetsState = useContext(MediaAssetsStateContext);
  const processingContext = useContext(MediaAssetsProcessingContext);
  const errorContext = useContext(MediaAssetsErrorsContext);
  const searchContext = useContext(MediaAssetsSearchContext);

  if (
    !mediaAssetsState ||
    !processingContext ||
    !errorContext ||
    !searchContext
  ) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { file, fileName } = mediaAssetsState;

  const fileType = fileName !== "" ? mediaType(fileName) : "image";

  const newEmptyAsset: Asset = useMemo(
    () => ({
      id: crypto.randomUUID(),
      name: fileName,
      type: fileType === "video" || fileType === "unknown" ? "image" : fileType,
      size: file ? sizeOfFile(file.size) : "unknown",
      usage: "",
      uploadDate: getCurrentDateFormatted(),
      url: "",
      fullPath: "",
      category: "",
      contentType: `.${fileName.split(".").pop()}`,
    }),
    [fileName, file, fileType],
  );

  return {
    ...mediaAssetsState,
    ...processingContext,
    ...errorContext,
    ...searchContext,
    fileType,
    newEmptyAsset,
  };
}
