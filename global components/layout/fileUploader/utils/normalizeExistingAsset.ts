import { Asset, RawAsset } from "../types/asset.types";

export const normalizeExistingAsset = (
  asset: RawAsset,
): Asset => {
  const assetType = asset.assetType ?? asset.type ?? "image";
  const name = asset.name ?? asset.originalName ?? "asset";
  const objectName = asset.storage?.objectName ?? asset.fullPath ?? "";
  const now = new Date().toISOString();

  return {
    ...asset,
    id: asset.id ?? crypto.randomUUID(),
    name,
    originalName: asset.originalName ?? name,
    assetType,
    mimeType: asset.mimeType ?? asset.contentType ?? "",
    size: asset.size ?? 0,
    tags: asset.tags ?? [],
    type: asset.type ?? assetType,
    fullPath: asset.fullPath ?? objectName,
    uploadDate: asset.uploadDate ?? asset.createdAt ?? now,
    createdAt: asset.createdAt ?? asset.uploadDate ?? now,
    updatedBy: asset.updatedBy ?? asset.createdBy ?? "",
    storage: {
      provider: asset.storage?.provider ?? "gcs",
      bucket: asset.storage?.bucket ?? "",
      objectName,
      generation: asset.storage?.generation ?? "",
      publicUrl: asset.storage?.publicUrl ?? asset.url ?? "",
    },
    display: {
      alt: asset.display?.alt ?? "",
      caption: asset.display?.caption ?? "",
      title:
        asset.display?.title ?? name.split(".").slice(0, -1).join("."),
    },
    references:
      asset.references?.map((reference) => ({
        ...reference,
        id:
          reference.id ||
          `${reference.category}-${reference.usage}-${reference.entityId ?? ""}-${reference.field ?? ""}`,
        category: reference.category || "",
        usage: reference.usage || reference.entityId || "",
      })) ?? [],
    isPublic: asset.isPublic ?? false,
  };
};
