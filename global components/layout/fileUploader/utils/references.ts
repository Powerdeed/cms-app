import { Asset, AssetReference } from "@global components/layout/fileUploader";

export const getAssetReferences = (asset: Asset): AssetReference[] => {
  return asset.references ?? [];
};

export const getReferenceLabel = (reference: AssetReference) =>
  reference.label ||
  [reference.category, reference.usage, reference.role, reference.field]
    .filter(Boolean)
    .join(" - ");
