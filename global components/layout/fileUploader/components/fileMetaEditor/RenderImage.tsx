"use client";

import Image from "next/image";
import useFileUploader from "../../hooks/useFileUploader";

export default function RenderImage() {
  const { uploaderState, uploaderActions } = useFileUploader();
  const targetAsset = uploaderState.targetAsset;

  if (!targetAsset) return null;
  return (
    <div className="min-h-0 rounded-[10px] border border-(--terciary-grey)/40 bg-(--terciary-grey)/20 overflow-hidden">
      {uploaderActions.previewUrl ? (
        <div className="relative h-full w-full">
          <Image
            src={uploaderActions.previewUrl}
            alt={targetAsset.display?.alt || targetAsset.name}
            fill
            unoptimized
            sizes="40vw"
            className="object-contain p-3"
          />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-style__small-text text-(--secondary-grey)">
          No preview available
        </div>
      )}
    </div>
  );
}
