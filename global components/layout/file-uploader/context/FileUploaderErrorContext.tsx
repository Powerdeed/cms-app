"use client";

import { createContext, Dispatch, SetStateAction } from "react";

type FileUploaderErrorState = {
  errorProcessingFile: boolean;
  setErrorProcessingFile: Dispatch<SetStateAction<boolean>>;
  errorUploadingFile: boolean;
  setErrorUploadingFile: Dispatch<SetStateAction<boolean>>;
  uploadingFile: boolean;
  setUploadingFile: Dispatch<SetStateAction<boolean>>;
  errorUploadingFileMsg: string;
  setErrorUploadingFileMsg: Dispatch<SetStateAction<string>>;
};

export const FileUploaderErrorContext =
  createContext<FileUploaderErrorState | null>(null);
