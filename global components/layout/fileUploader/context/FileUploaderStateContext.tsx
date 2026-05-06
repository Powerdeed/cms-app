"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { FileType } from "../types/fileUploader.types";
import { AssetRef } from "../types/asset.types";

export type AssetRefHandler = (val: AssetRef) => void;

type FileUploaderState = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  fileName: string;
  setFileName: Dispatch<SetStateAction<string>>;
  targetFileType: FileType | "All";
  setTargetFileType: Dispatch<SetStateAction<FileType | "All">>;
  targetFileTypes: FileType[];
  setTargetFileTypes: Dispatch<SetStateAction<FileType[]>>;
  defaultIsPublic: boolean;
  setDefaultIsPublic: Dispatch<SetStateAction<boolean>>;
  hasFeaturePath: boolean;
  setHasFeaturePath: Dispatch<SetStateAction<boolean>>;
  featurePath: string;
  setFeaturePath: Dispatch<SetStateAction<string>>;
  uploadedFile: string;
  setUploadedFile: Dispatch<SetStateAction<string>>;
  assetRef: AssetRefHandler | null;
  setAssetRef: Dispatch<SetStateAction<AssetRefHandler | null>>;
};

export const FileUploaderStateContext =
  createContext<FileUploaderState | null>(null);
