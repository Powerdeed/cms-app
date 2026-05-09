"use client";

import { useEffect, useState } from "react";
import { ButtonLight } from "@global components/ui/Button";
import { Asset, AssetRef } from "../types/asset.types";
import { getAssets } from "../services/uploadFile";
import { sizeOfFile } from "../utils/fileConversions";

type ExistingAssetPickerProps = {
  onSelect: (assetRef: AssetRef) => void;
  onCancel: () => void;
};

export default function ExistingAssetPicker({
  onSelect,
  onCancel,
}: ExistingAssetPickerProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setAssets(await getAssets());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load assets");
      }
    };

    loadAssets();
  }, []);

  return (
    <div className="feature-container-vertical text-style__body border border-(--terciary-grey) rounded-[10px] p-3 bg-white">
      <div className="flex items-center gap-2.5">
        <div className="flex-1 text-style__small-text--bold">
          Add from existing file
        </div>
        <ButtonLight buttonText="Cancel" clickAction={onCancel} />
      </div>

      <div className="max-h-70 overflow-y-auto section-scrollbar flex flex-col gap-2.5">
        {assets.map((asset) => (
          <button
            key={asset.id}
            type="button"
            className="text-left p-2 rounded-[10px] border border-(--terciary-grey) hover:border-(--secondary-blue) hover:bg-(--secondary-blue)/5"
            onClick={() => onSelect([asset.id, asset.name])}
          >
            <div className="text-style__small-text--bold">{asset.name}</div>
            <div className="text-style__small-text text-(--secondary-grey)">
              {asset.assetType ?? asset.type ?? "asset"} ·{" "}
              {sizeOfFile(asset.size)}
            </div>
          </button>
        ))}
      </div>

      {error && <div className="text-(--primary-red)">*{error}*</div>}
    </div>
  );
}
