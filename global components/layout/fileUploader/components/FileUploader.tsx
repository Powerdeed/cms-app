"use client";

// hooks
import useFileUploader from "../hooks/useFileUploader";

//  components
import FileRenameAndUpload from "./FileRenameAndUpload";
import CompressingAsset from "./CompressingAsset";
import FileHandlingError from "./FileHandlingError";
import { Asset } from "../types/asset.types";

// context
import { DropZone } from "@global components/layout/fileUploader";

type FileUploaderProps = {
  onAssetUploaded?: (asset: Asset) => void;
};

export default function FileUploader({ onAssetUploaded }: FileUploaderProps) {
  const { uploaderState, uploaderActions } = useFileUploader();

  return (
    <div>
      {uploaderActions.popUpToDisplay.dropZone && <DropZone />}

      {uploaderActions.popUpToDisplay.compressing && <CompressingAsset />}

      {uploaderState.assetMode === "new" &&
        uploaderActions.popUpToDisplay.assetMediaEditor && (
          <FileRenameAndUpload onAssetUploaded={onAssetUploaded} />
        )}

      {uploaderActions.popUpToDisplay.assetHandlingError && (
        <FileHandlingError />
      )}
    </div>
  );
}
