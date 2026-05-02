"use client";

import { FileHandlingError } from "@global components/layout/file-uploader";
import useMediaAssets from "../hooks/useAssets";

export default function AssetHandlingError() {
  const { actions } = useMediaAssets();

  return (
    <FileHandlingError
      errorMsg={actions.errorMsg}
      onRetry={() => actions.handleResetAssetStates("re-upload")}
    />
  );
}
