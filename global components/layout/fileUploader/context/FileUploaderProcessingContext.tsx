"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type FileUploaderProcessingState = {
  compressing: boolean;
  setCompressing: Dispatch<SetStateAction<boolean>>;
  isSupportedFile: boolean | null;
  setIsSupportedFile: Dispatch<SetStateAction<boolean | null>>;
  compressionProgress: number;
  setCompressionProgress: Dispatch<SetStateAction<number>>;
  errorProcessingFile: boolean;
  setErrorProcessingFile: Dispatch<SetStateAction<boolean>>;
  errorUploadingFile: boolean;
  setErrorUploadingFile: Dispatch<SetStateAction<boolean>>;
  errorUploadingFileMsg: string;
  setErrorUploadingFileMsg: Dispatch<SetStateAction<string>>;
};

export const FileUploaderProcessingContext =
  createContext<FileUploaderProcessingState | null>(null);
