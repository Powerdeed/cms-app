"use client";

import { createContext, Dispatch } from "react";

type FileUploaderApiStates = {
  isAssetUploading: boolean;
  setIsAssetUploading: Dispatch<React.SetStateAction<boolean>>;

  isAssetDeleting: boolean;
  setIsAssetDeleting: Dispatch<React.SetStateAction<boolean>>;

  assetApiOnError: string;
  setAssetApiOnError: Dispatch<React.SetStateAction<string>>;
};

export const FileUploaderApiContext =
  createContext<FileUploaderApiStates | null>(null);
