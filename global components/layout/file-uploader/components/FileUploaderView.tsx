"use client";

// modules
import { useContext, useEffect } from "react";

// hooks
import useFileUploader from "../hooks/useFileUploader";

//  components
import FileUploaderFileEditor from "./FileUploaderFileEditor";
import FileCompressing from "./FileCompressing";
import FileHandlingError from "./FileHandlingError";
import FileDropZone from "./FileDropZone";

// context
import {
  FileUploaderErrorContext,
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/file-uploader";

// types
import { FileUploaderProps } from "../types/fileUploader.props";

export default function FileUploaderView({
  targetFileTypes,
  path,
  changeFunc,
  selectedFileName,
  uploadingStatus,
  metadata,
  onPathChange,
  onRename,
  onReset,
  onSubmit,
  onUploaded,
}: FileUploaderProps) {
  const fileUploaderState = useContext(FileUploaderStateContext);
  const fileUploaderProcessing = useContext(FileUploaderProcessingContext);
  const fileUploaderErrors = useContext(FileUploaderErrorContext);
  const { fileUploaderActions } = useFileUploader();

  if (!fileUploaderState || !fileUploaderProcessing || !fileUploaderErrors) {
    throw new Error("FileUploader must be used within FileUploaderProvider");
  }

  useEffect(() => {
    const initializer = () => {
      fileUploaderState.setTargetFileTypes(targetFileTypes);
      fileUploaderActions.pathSetter(path);
      onPathChange?.(path);
    };

    initializer();
  }, [
    targetFileTypes,
    path,
    fileUploaderState,
    fileUploaderActions,
    onPathChange,
  ]);

  return (
    <div>
      {/* Ready to upload */}
      {fileUploaderActions.popUpToDisplay.dropZone && (
        <FileDropZone
          dropRef={fileUploaderActions.fileDropRef}
          targetFileTypes={fileUploaderState.targetFileTypes}
          supportedTypes={fileUploaderActions.supportedTypes}
          setFile={fileUploaderState.setFile}
          setFileName={fileUploaderState.setFileName}
          setCompressing={fileUploaderProcessing.setCompressing}
          setCompressionProgress={fileUploaderProcessing.setCompressionProgress}
        />
      )}

      {/* Compressing */}
      {fileUploaderActions.popUpToDisplay.compressing && (
        <FileCompressing
          progress={fileUploaderProcessing.compressionProgress}
        />
      )}

      {/* Editor */}
      {fileUploaderActions.popUpToDisplay.assetMediaEditor && (
        <FileUploaderFileEditor
          changeFunc={changeFunc}
          selectedFileName={selectedFileName}
          uploadingStatus={uploadingStatus}
          metadata={metadata}
          onRename={onRename}
          onSubmit={onSubmit}
          onUploaded={onUploaded}
        />
      )}

      {/* Error */}
      {fileUploaderActions.popUpToDisplay.assetHandlingError && (
        <FileHandlingError
          errorMsg={fileUploaderActions.errorMsg}
          onRetry={() => onReset?.()}
        />
      )}
    </div>
  );
}
