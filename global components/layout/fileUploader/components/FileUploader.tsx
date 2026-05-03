"use client";

import FileUploaderView from "./FileUploaderView";

import { FileType } from "../types/asset.types";
export default function FileUploader({
  targetFileTypes,
  path,
  changeFunc,
}: {
  targetFileTypes: FileType[];
  path: string;
  changeFunc: (val: string) => void;
}) {
  return (
    <FileUploaderView
      targetFileTypes={targetFileTypes}
      path={path}
      changeFunc={changeFunc}
    />
  );
}
