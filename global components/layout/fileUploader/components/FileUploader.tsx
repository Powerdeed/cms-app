"use client";

// hooks
import useFileUploader from "../hooks/useFileUploader";

//  components
import FileRenameAndUpload from "./FileRenameAndUpload";
import CompressingFile from "./CompressingAsset";
import FileHandlingError from "./FileHandlingError";

// context
import { DropZone } from "@global components/layout/fileUploader";

export default function FileUploader() {
  const { uploaderState, uploaderActions } = useFileUploader();

  return (
    <div>
      {uploaderActions.popUpToDisplay.dropZone && <DropZone />}

      {uploaderActions.popUpToDisplay.compressing && <CompressingFile />}

      {uploaderState.assetMode === "new" &&
        uploaderActions.popUpToDisplay.assetMediaEditor && (
          <FileRenameAndUpload />
        )}

      {uploaderActions.popUpToDisplay.assetHandlingError && (
        <FileHandlingError />
      )}
    </div>
  );
}
