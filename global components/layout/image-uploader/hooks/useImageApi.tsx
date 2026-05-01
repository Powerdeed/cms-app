"use client";

import { useContext } from "react";

import { mediaAssetsUploadingContext } from "@features/mediaAndAssets/context/MediaAssetsUploadingContext";
import { MediaAssetsStateContext } from "@features/mediaAndAssets/context/MediaAssetsStateContext";

import { uploadImage } from "../services/uploadImage";

export default function useImageUploaderApi() {
  const mediaAssetState = useContext(MediaAssetsStateContext);
  const mediaAssetUploading = useContext(mediaAssetsUploadingContext);

  if (!mediaAssetState || !mediaAssetUploading)
    throw new Error("MediaAssetsContext context must be withing a provider.");

  const { file, setUploadedFile } = mediaAssetState;
  const { setUploadingAsset, setErrorUploadingAssetMsg } = mediaAssetUploading;

  const assetUploadingHandler = async () => {
    if (file) {
      setUploadingAsset(true);
      setErrorUploadingAssetMsg("");
      try {
        const formData = new FormData();
        formData.append("type", "image/jpeg");
        formData.append("file", file);
        formData.append("path", "services/Electrical Installation/hero.jpg");
        formData.append("usage", "Electrical Installation");
        formData.append("category", "services");
        formData.append("tags", "electrical,installation,featured");

        console.log(file);

        const data = await uploadImage(formData);

        if (data) {
          console.log(data);
          setUploadedFile(data.imageUrl);
        }
      } catch (err) {
        console.error(err);
        if (err instanceof Error) setErrorUploadingAssetMsg(err.message);
      } finally {
        setUploadingAsset(false);
      }
    }
  };

  return { assetUploadingHandler };
}
