"use client";

import { useContext } from "react";

import { FileUploaderStateContext } from "@global components/layout/file-uploader";

export default function useFilePaths() {
  const fileUploaderState = useContext(FileUploaderStateContext);

  if (!fileUploaderState)
    throw new Error("FileUploaderContext context must be withing a provider.");

  const { setHasFeaturePath, setFeaturePath } = fileUploaderState;

  const pathSetter = (path: string) => {
    setHasFeaturePath(true);
    setFeaturePath(path);
  };

  return { pathSetter };
}
