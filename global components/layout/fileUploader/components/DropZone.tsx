"use client";

import { useRef } from "react";
import {
  dragHandler,
  dragLeaveHandler,
  dropHandler,
  onFileChange,
} from "draftify-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFileUploader from "../hooks/useFileUploader";

export default function DropZone() {
  const dropRef = useRef<HTMLDivElement | null>(null);

  const { uploaderState, uploaderActions } = useFileUploader();

  return (
    <div
      ref={dropRef}
      onDrop={(e) =>
        dropHandler(
          e,
          uploaderState.setFile,
          uploaderState.setFileName,
          uploaderState.setCompressing,
          uploaderState.setCompressionProgress,
        )
      }
      onDragOver={(e) => dragHandler(e, dropRef)}
      onDragLeave={(e) => dragLeaveHandler(e, dropRef)}
      onMouseLeave={(e) => dragLeaveHandler(e, dropRef)}
      className="h-80 grid items-center border-2 border-(--secondary-blue) border-dashed rounded-[10px] text-(--secondary-blue)"
    >
      <input
        type="file"
        id="file"
        className="hidden"
        onChange={(e) =>
          onFileChange(
            e,
            uploaderState.setFile,
            uploaderState.setFileName,
            uploaderState.setCompressing,
            uploaderState.setCompressionProgress,
          )
        }
      />
      <label
        htmlFor="file"
        className="flex h-full flex-col justify-center items-center text-center gap-5 px-4 py-2 rounded-[10px] cursor-pointer"
      >
        <div className="border rounded-[50%] flex justify-center items-center w-15 h-15 text-[20px] cursor-pointer">
          <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
        </div>
        <div className="text-style__body">
          Drop your {uploaderState.targetFileTypes.join(" or ")} here or click
          to browse
        </div>
        <div className="text-style__small-text text-(--primary-grey)">
          Supported formats: {uploaderActions.supportedTypes}
        </div>
      </label>
    </div>
  );
}
