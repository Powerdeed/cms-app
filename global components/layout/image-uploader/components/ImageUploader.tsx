"use client";

import ImageUploaderView from "./ImageUploaderView";
import ImageProvider from "../context/ImageProvider";
import { FileType } from "@global utils/global-states.types";

export default function ImageUploader({
  targetFileTypes,
  path,
  changeFunc,
}: {
  targetFileTypes: FileType[];
  path: string;
  changeFunc: (val: string) => void;
}) {
  return (
    <ImageProvider>
      <ImageUploaderView
        targetFileTypes={targetFileTypes}
        path={path}
        changeFunc={changeFunc}
      />
    </ImageProvider>
  );
}
