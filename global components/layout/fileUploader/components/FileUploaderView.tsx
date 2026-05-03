"use client";

// modules
import { useEffect } from "react";

// hooks
import useFileUploader from "../hooks/useFileUploader";

//  components
import FileUploaderFileEditor from "./FileUploaderFileEditor";
import CompressingFile from "./CompressingAsset";
import FileHandlingError from "./FileHandlingError";

// context
import { DropZone, FileType } from "@global components/layout/fileUploader";

export default function FileUploaderView({
  targetFileTypes,
  path,
  changeFunc,
}: {
  targetFileTypes: FileType[];
  path: string;
  changeFunc: (val: string) => void;
}) {
  const { uploaderState, uploaderActions } = useFileUploader();

  useEffect(() => {
    const initializer = () => {
      uploaderState.setTargetFileTypes(targetFileTypes);
      uploaderActions.pathSetter(path);
      uploaderActions.updatePathSetters();
      uploaderState.setAssetMode("new");
    };

    initializer();
  }, [uploaderActions, uploaderState, path, targetFileTypes]);

  return (
    <div>
      {/* Ready to upload */}
      {uploaderActions.popUpToDisplay.dropZone && <DropZone />}

      {/* Compressing */}
      {uploaderActions.popUpToDisplay.compressing && <CompressingFile />}

      {/* Editor */}
      {uploaderActions.popUpToDisplay.assetMediaEditor && (
        <FileUploaderFileEditor changeFunc={changeFunc} />
      )}

      {/* Error */}
      {uploaderActions.popUpToDisplay.assetHandlingError && (
        <FileHandlingError />
      )}
    </div>
  );
}
