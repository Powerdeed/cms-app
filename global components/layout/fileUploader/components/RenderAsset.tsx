"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AssetLink, FeaturedImageLink, FileType } from "../types/asset.types";

type RenderableAsset =
  | AssetLink
  | FeaturedImageLink
  | {
      assetId?: string;
      fileName: string;
      fileUrl: string;
      assetType: FileType;
    };

const assetFromLink = (asset: RenderableAsset) => {
  if (Array.isArray(asset)) {
    const [assetId, fileName, fileUrl, assetType] = asset;

    return { assetId, fileName, fileUrl, assetType: assetType ?? "image" };
  }

  return { ...asset, assetType: asset.assetType ?? "image" };
};

const iconByAssetType: Record<FileType, "image" | "file-lines"> = {
  image: "image",
  diagram: "image",
  document: "file-lines",
  video: "file-lines",
};

export default function RenderAsset({
  asset,
  className = "",
}: {
  asset: RenderableAsset;
  className?: string;
}) {
  const { fileName, fileUrl, assetType } = assetFromLink(asset);

  if (assetType === "image" || assetType === "diagram") {
    return (
      <Image
        src={fileUrl}
        alt={fileName}
        fill
        sizes="(max-width: 768px) 50vw, 220px"
        className={`object-cover ${className}`}
      />
    );
  }

  if (assetType === "video") {
    return (
      <video
        src={fileUrl}
        className={`h-full w-full object-cover ${className}`}
        muted
        controls
        preload="metadata"
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-(--terciary-grey)/30 p-3 text-center ${className}`}
    >
      <FontAwesomeIcon
        icon={["fas", iconByAssetType[assetType]]}
        className="text-style__heading text-(--secondary-blue)"
      />
      <div className="max-w-full truncate text-style__small-text">
        {fileName}
      </div>
    </div>
  );
}
