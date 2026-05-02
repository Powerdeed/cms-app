"use client";

import { useRef } from "react";

import { FileDropZone } from "@global components/layout/file-uploader";

import useMediaAssets from "../hooks/useAssets";

export default function DropZone() {
  const mediaDropRef = useRef<HTMLDivElement | null>(null);

  const { state, actions } = useMediaAssets();

  return (
    <FileDropZone
      dropRef={mediaDropRef}
      targetFileTypes={state.targetFileTypes}
      supportedTypes={actions.supportedTypes}
      setFile={state.setFile}
      setFileName={state.setFileName}
      setCompressing={state.setCompressing}
      setCompressionProgress={state.setCompressionProgress}
    />
  );
}
