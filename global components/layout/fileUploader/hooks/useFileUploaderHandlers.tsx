"use client";

import { useContext, useRef } from "react";

import { FileUploaderStateContext } from "@global components/layout/fileUploader";

export default function useFileUploaderHandlers() {
  const fileUploaderState = useContext(FileUploaderStateContext);

  if (!fileUploaderState)
    throw new Error("FileUploaderContext context must be withing a provider.");

  const { fileName } = fileUploaderState;
  const fileDropRef = useRef<HTMLDivElement | null>(null);

  const fileExtension = fileName.includes(".")
    ? `.${fileName.split(".").pop()}`
    : "";

  return { fileDropRef, fileExtension };
}
