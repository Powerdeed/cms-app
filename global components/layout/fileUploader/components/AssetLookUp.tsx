"use client";

import { useEffect } from "react";

import Button from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";

import useFileUploader from "../hooks/useFileUploader";

import { execute } from "@lib/api/execute";

import { getAsset } from "../services/uploadFile";
import { normalizeExistingAsset } from "../utils/normalizeExistingAsset";

export default function AssetLookUp({
  label,
  addButtonText = "Add",
  onFindSuccess,
}: {
  label?: string;
  addButtonText?: string;
  onFindSuccess: () => void;
}) {
  const { uploaderState } = useFileUploader();
  const {
    targetAsset,
    setAssetMode,
    setTargetAsset,
    searchedAsset,
    setSearchedAsset,
    lookingUpAsset,
    setLookingUpAsset,
    assetLookUpError,
    setAssetLookUpError,
  } = uploaderState;

  const activateAddButton =
    !!targetAsset && !lookingUpAsset && !assetLookUpError;

  useEffect(() => {
    const assetId = searchedAsset.trim();

    if (!assetId) {
      setTargetAsset(null);
      setAssetLookUpError("");
      return;
    }

    const findAsset = async () => {
      setTargetAsset(null);

      await execute(() => getAsset(assetId), {
        setLoading: setLookingUpAsset,
        setError: setAssetLookUpError,
        onSuccess: (asset) => {
          const normalizedAsset = normalizeExistingAsset(asset);

          setAssetMode("existing");
          setTargetAsset(normalizedAsset);
        },
      });
    };

    findAsset();
  }, [
    searchedAsset,
    setAssetLookUpError,
    setAssetMode,
    setLookingUpAsset,
    setTargetAsset,
  ]);

  return (
    <div className="flex-1 vertical-layout__inner w-full text-style__small-text">
      {label && <label className="block mb-2">{label}</label>}

      <div className="flex gap-2.5 items-center">
        <textarea
          className="flex-1 w-full input-style field-sizing-content"
          placeholder={label ?? "paste an existing file id here"}
          value={searchedAsset}
          onChange={(e) => setSearchedAsset(e.target.value)}
        />

        {targetAsset && (
          <Button
            buttonText={addButtonText}
            disabled={!activateAddButton}
            clickAction={onFindSuccess}
          >
            {lookingUpAsset && <Loader />}
          </Button>
        )}
      </div>

      {assetLookUpError && (
        <div className="text-(--primary-red)">{assetLookUpError}</div>
      )}
    </div>
  );
}
