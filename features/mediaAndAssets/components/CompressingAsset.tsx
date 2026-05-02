"use client";

import { FileCompressing } from "@global components/layout/file-uploader";
import useMediaAssets from "../hooks/useAssets";

export default function CompressingAsset() {
  const { state } = useMediaAssets();

  return <FileCompressing progress={state.compressionProgress} />;
}
