"use client";

import { useRef } from "react";

import {
  dragHandler,
  dragLeaveHandler,
  dropHandler,
  onFileChange,
} from "draftify-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useMediaAssets from "../hooks/useAssets";

export default function DropZone() {
  const mediaDropRef = useRef<HTMLDivElement | null>(null);

  const { state, actions } = useMediaAssets();

  return (
    <div
      ref={mediaDropRef}
      onDrop={(e) =>
        dropHandler(
          e,
          state.setFile,
          state.setFileName,
          state.setCompressing,
          state.setCompressionProgress,
        )
      }
      onDragOver={(e) => dragHandler(e, mediaDropRef)}
      onDragLeave={(e) => dragLeaveHandler(e, mediaDropRef)}
      onMouseLeave={(e) => dragLeaveHandler(e, mediaDropRef)}
      className="h-80 grid items-center border-2 border-(--secondary-blue) border-dashed rounded-[10px] text-(--secondary-blue)"
    >
      <input
        type="file"
        id="file"
        className="hidden"
        onChange={(e) =>
          onFileChange(
            e,
            state.setFile,
            state.setFileName,
            state.setCompressing,
            state.setCompressionProgress,
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
          Drop your {state.targetFileTypes.join(" or ")} here or click to browse
        </div>
        <div className="text-style__small-text text-(--primary-grey)">
          Supported formats: {actions.supportedTypes}
        </div>
      </label>
    </div>
  );
}
