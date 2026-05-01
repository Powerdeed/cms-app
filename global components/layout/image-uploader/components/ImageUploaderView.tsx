"use client";

// modules
import { useEffect } from "react";

// hooks
import useImageUploader from "../hooks/useImageUploader";
import useMediaAssets from "@features/mediaAndAssets/hooks/useAssets";

//  components
import DropZone from "@features/mediaAndAssets/components/DropZone";
import CompressingAsset from "@features/mediaAndAssets/components/CompressingAsset";
import AssetHandlingError from "@features/mediaAndAssets/components/AssetHandlingError";
import ImageUploaderFileEditor from "./ImageUploaderFileEditor";

// utils
import { FileType } from "@global utils/global-states.types";

export default function ImageUploaderView({
  targetFileTypes,
  path,
  changeFunc,
}: {
  path: string;
  changeFunc: (val: string) => void;
  targetFileTypes: FileType[];
}) {
  const { state } = useMediaAssets();
  const { imageUploaderState, imageUploaderActions } = useImageUploader();

  useEffect(() => {
    const initializer = () => {
      state.setAssetMode("new");
      state.setTargetFileTypes(targetFileTypes);
      imageUploaderActions.pathSetter(path);
    };

    initializer();
  }, [targetFileTypes, path, state, imageUploaderActions, imageUploaderState]);

  return (
    <div>
      {/* Ready to upload */}
      {imageUploaderActions.popUpToDisplay.dropZone && <DropZone />}

      {/* Compressing */}
      {imageUploaderActions.popUpToDisplay.compressing && <CompressingAsset />}

      {/* Editor */}
      {imageUploaderActions.popUpToDisplay.assetMediaEditor && (
        <ImageUploaderFileEditor changeFunc={changeFunc} />
      )}

      {/* Error */}
      {imageUploaderActions.popUpToDisplay.assetHandlingError && (
        <AssetHandlingError />
      )}
    </div>
  );
}
