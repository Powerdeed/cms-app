"use client";

import useFileMetadataState from "./useFileUploaderState";
import useAssetCreation from "./useAssetCreation";
import useFileUploaderEditing from "./useFileUploaderEditing";
import useFileUploaderErrors from "./useFileUploaderErrors";
import useAssetPaths from "./useAssetPaths";
import useFileUploaderApi from "./useFileUploaderApi";
import useNewAsset from "./useNewAsset";
import useMetaEditor from "./useMetaEditor";
import useAssetFeatureLinks from "./useAssetFeatureLinks";

export default function useFileUploader() {
  const uploaderState = useFileMetadataState();

  const newAsset = useNewAsset();
  const api = useFileUploaderApi();
  const creation = useAssetCreation();
  const editing = useFileUploaderEditing();
  const errors = useFileUploaderErrors();
  const paths = useAssetPaths();
  const assetLinks = useAssetFeatureLinks();
  const meta = useMetaEditor();

  return {
    uploaderState,
    uploaderActions: {
      ...newAsset,
      ...api,
      ...creation,
      ...editing,
      ...errors,
      ...paths,
      ...assetLinks,
      ...meta,
    },
  };
}
