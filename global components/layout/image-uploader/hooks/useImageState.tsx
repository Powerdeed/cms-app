"use client";

import { useContext, useMemo } from "react";

import { Asset } from "@features/mediaAndAssets";

import { imageContext } from "../context/ImageContext";
import { MediaAssetsStateContext } from "@features/mediaAndAssets/context/MediaAssetsStateContext";

import {
  getCurrentDateFormatted,
  mediaType,
  sizeOfFile,
} from "@features/mediaAndAssets/utils/conversions";

export default function useImageState() {
  const imageState = useContext(imageContext);
  const mediaAssetsContext = useContext(MediaAssetsStateContext);

  if (!imageState || !mediaAssetsContext) {
    throw new Error("Context must be used within a Provider");
  }

  const { file, fileName, assetCategory, featurePath } = mediaAssetsContext;

  const fileType = fileName !== "" ? mediaType(fileName) : "image";

  const newEmptyAsset: Asset = useMemo(
    () => ({
      id: crypto.randomUUID(),
      name: fileName,
      type: fileType === "video" || fileType === "unknown" ? "image" : fileType,
      size: file ? sizeOfFile(file.size) : "unknown",
      usage: featurePath,
      uploadDate: getCurrentDateFormatted(),
      url: "",
      fullPath: `${featurePath}/${fileName}`,
      category: assetCategory,
      contentType: `.${fileName.split(".").pop()}`,
    }),
    [fileName, file, fileType, assetCategory, featurePath],
  );

  return { ...imageState, newEmptyAsset };
}
