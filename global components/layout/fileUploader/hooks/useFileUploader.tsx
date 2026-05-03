"use client";

import useFileHandlers from "./useFileUploaderHandlers";
import useFileMetadataState from "./useFileUploaderState";
import useFileUploaderClipboard from "./useFileUploaderClipboard";
import useFileUploaderCreation from "./useFileUploaderCreation";
import useFileUploaderEditing from "./useFileUploaderEditing";
import useFileUploaderError from "./useFileUploaderError";
import useFileUploaderPaths from "./useFileUploaderPaths";
import useFileUploaderApi from "./useFileUploaderApi";
import useFileUploaderNewAsset from "./useFileUploaderNewAsset";

export default function useFileUploader() {
  const uploaderState = useFileMetadataState();

  const newAsset = useFileUploaderNewAsset();
  const api = useFileUploaderApi();
  const handlers = useFileHandlers();
  const clipboard = useFileUploaderClipboard();
  const creation = useFileUploaderCreation();
  const editing = useFileUploaderEditing();
  const errors = useFileUploaderError();
  const paths = useFileUploaderPaths();

  return {
    uploaderState,
    uploaderActions: {
      ...newAsset,
      ...api,
      ...handlers,
      ...clipboard,
      ...creation,
      ...editing,
      ...errors,
      ...paths,
    },
  };
}
