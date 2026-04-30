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
  const { imageUploaderState, actions } = useImageUploader();

  useEffect(() => {
    const initializer = () => {
      state.setAssetMode("new");
      state.setTargetFileTypes(targetFileTypes);
      actions.pathSetter(path);
    };

    initializer();
  }, [targetFileTypes, path, state, actions, imageUploaderState]);

  return (
    <div>
      {/* Ready to upload */}
      {actions.popUpToDisplay.dropZone && <DropZone />}

      {/* Compressing */}
      {actions.popUpToDisplay.compressing && <CompressingAsset />}

      {/* Editor */}
      {actions.popUpToDisplay.assetMediaEditor && (
        <ImageUploaderFileEditor changeFunc={changeFunc} />
      )}

      {/* Error */}
      {actions.popUpToDisplay.assetHandlingError && <AssetHandlingError />}
    </div>
  );
}
