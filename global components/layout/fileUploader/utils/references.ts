import { Asset, AssetReference } from "@global components/layout/fileUploader";

export const getAssetReferences = (asset: Asset): AssetReference[] => {
  if (asset.references?.length) return asset.references;

  return (
    asset.relationships?.map((relationship) => ({
      id: `${relationship.entityType}-${relationship.entityId}-${relationship.field}-${relationship.role}`,
      category: relationship.entityType,
      usage: relationship.entityId,
      entityId: relationship.entityId,
      field: relationship.field,
      role: relationship.role || undefined,
      entityType: relationship.entityType,
    })) ?? []
  );
};

export const getReferenceLabel = (reference: AssetReference) =>
  reference.label ||
  [reference.category, reference.usage, reference.role, reference.field]
    .filter(Boolean)
    .join(" - ");
