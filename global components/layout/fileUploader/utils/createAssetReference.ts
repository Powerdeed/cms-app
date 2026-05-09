import { AssetReference } from "../types/asset.types";

type CreateAssetReferenceInput = {
  category: string;
  usage: string;
  entityId?: string;
  field?: string;
  role?: string;
  label?: string;
};

export const createAssetReference = ({
  category,
  usage,
  entityId,
  field,
  role,
  label,
}: CreateAssetReferenceInput): AssetReference => ({
  id: crypto.randomUUID(),
  category,
  usage,
  entityId,
  field,
  role,
  label,
});
