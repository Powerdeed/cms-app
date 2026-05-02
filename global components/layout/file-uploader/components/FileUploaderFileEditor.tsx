"use client";

// modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import { InputArea } from "@global components/layout/FormWrapper";

// hooks
import useFileUploader from "../hooks/useFileUploader";
import {
  FileUploaderProcessingContext,
  FileUploaderStateContext,
} from "@global components/layout/file-uploader";

// utils
import { removeExtensionName } from "../utils/removeExtensionName";
import { useContext } from "react";
import { FileUploaderProps } from "../types/fileUploader.props";

export default function FileUploaderFileEditor({
  changeFunc,
  selectedFileName,
  uploadingStatus,
  metadata,
  onRename,
  onSubmit,
  onUploaded,
}: Pick<
  FileUploaderProps,
  | "changeFunc"
  | "selectedFileName"
  | "uploadingStatus"
  | "metadata"
  | "onRename"
  | "onSubmit"
  | "onUploaded"
>) {
  const fileUploaderState = useContext(FileUploaderStateContext);
  const fileUploaderProcessing = useContext(FileUploaderProcessingContext);
  const { fileUploaderActions } = useFileUploader();

  if (!fileUploaderState || !fileUploaderProcessing) {
    throw new Error("FileUploader must be used within FileUploaderProvider");
  }

  const effectiveFileName = selectedFileName ?? fileUploaderState.fileName;

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!fileUploaderState.file) return;

        const formData = new FormData();
        formData.append("file", fileUploaderState.file);
        formData.append("fileName", fileUploaderState.fileName);

        if (metadata) formData.append("asset", JSON.stringify(metadata));

        await onSubmit?.({
          file: fileUploaderState.file,
          fileName: fileUploaderState.fileName,
          formData,
        });
      }}
      className="feature-container-vertical h-fit text-style__body"
    >
      <div className="relative">
        <FontAwesomeIcon
          icon={["fas", "xmark"]}
          className="absolute right-0 text-(--primary-blue) cursor-pointer"
          onClick={() => fileUploaderActions.resetFileUploader()}
        />
      </div>

      <div className="vertical-layout__inner">
        <InputArea
          label={`Rename your file? (optional), don't include the "${fileUploaderActions.fileExtension}" file extension name`}
          val={removeExtensionName(effectiveFileName)}
          changeFunc={(val) => {
            const nextFileName = `${val}${fileUploaderActions.fileExtension}`;
            fileUploaderState.setFileName(nextFileName);
            onRename?.(nextFileName);
          }}
        >
          {fileUploaderActions.fileExtension}
        </InputArea>
      </div>

      <Button
        type="submit"
        className="flex-1"
        buttonText="Add File"
        clickAction={() => {
          changeFunc(fileUploaderState.fileName);
          fileUploaderActions.fileUploadingHandler(metadata, (url) => {
            onUploaded?.(url);

            if (metadata) {
              onSubmit?.({
                file: fileUploaderState.file!,
                fileName: fileUploaderState.fileName,
                formData: new FormData(),
              });
            }
          });
        }}
      >
        {(uploadingStatus ?? fileUploaderProcessing.uploadingStatus) && (
          <Loader />
        )}
      </Button>
    </form>
  );
}
