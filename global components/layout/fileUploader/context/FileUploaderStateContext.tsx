"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { FileType } from "../types/fileUploader.types";

type FileUploaderState = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  targetFileType: FileType | "All";
  setTargetFileType: Dispatch<SetStateAction<FileType | "All">>;
  targetFileTypes: FileType[];
  setTargetFileTypes: Dispatch<SetStateAction<FileType[]>>;
  hasFeaturePath: boolean;
  setHasFeaturePath: Dispatch<SetStateAction<boolean>>;
  featurePath: string;
  setFeaturePath: Dispatch<SetStateAction<string>>;
  uploadedFile: string;
  setUploadedFile: Dispatch<SetStateAction<string>>;
};

export const FileUploaderStateContext =
  createContext<FileUploaderState | null>(null);
