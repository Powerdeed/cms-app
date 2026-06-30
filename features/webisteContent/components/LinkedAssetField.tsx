"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Buttonize } from "@global components/ui/Button";
import {
  Asset,
  AssetLookUp,
  createFeaturedImageLink,
  FileUploader,
  RenderAsset,
  useFileUploader,
} from "@global components/layout/fileUploader";
import { truncateTxt } from "@globals";
import { LinkedAsset } from "../types/linkedAsset.types";

type AssetAddMode = "existing" | "new" | null;

export default function LinkedAssetField({
  label,
  value,
  uploadPath,
  onChange,
}: {
  label: string;
  value: LinkedAsset | null;
  uploadPath: string;
  onChange: (asset: LinkedAsset | null) => void;
}) {
  const { uploaderState, uploaderActions } = useFileUploader();
  const [assetAddMode, setAssetAddMode] = useState<AssetAddMode>(null);

  const prepareUploadPath = () => {
    uploaderState.setTargetFileTypes(["image"]);
    uploaderState.setDefaultIsPublic(true);
    uploaderActions.pathSetter(uploadPath);
    uploaderActions.updatePathSetters(undefined, uploadPath);
  };

  const handleAssetAddMode = (mode: AssetAddMode) => {
    if (!mode) {
      setAssetAddMode(null);
      uploaderActions.resetAssetLinkingState();
      return;
    }

    prepareUploadPath();
    setAssetAddMode(mode);

    if (mode === "new") {
      uploaderActions.handleTargetAsset("new");
      return;
    }

    uploaderActions.resetAssetLinkingState();
  };

  const linkAsset = (asset: Asset) => {
    onChange(createFeaturedImageLink(asset));
    setAssetAddMode(null);
    uploaderActions.resetAssetLinkingState();
  };

  return (
    <div className="vertical-layout__inner">
      <div>{label}</div>

      <div className="flex flex-col gap-2.5 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <button
            type="button"
            className="group relative min-h-10 min-w-10 flex-1 rounded-[10px] bg-(--secondary-grey)/30 p-2 text-left text-style__small-text hover:bg-(--secondary-grey)/50"
            onClick={() =>
              value && uploaderState.setSelectedAssetId(value.assetId)
            }
          >
            <span className="block truncate">
              {value ? truncateTxt(value.fileName, 100) : "No asset selected"}
            </span>

            {value && (
              <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-50 hidden h-45 w-65 overflow-hidden rounded-[10px] border border-(--terciary-grey) bg-white shadow-xl group-hover:block">
                <RenderAsset asset={value} />
              </div>
            )}
          </button>

          {value && (
            <Buttonize
              clickFunc={() => onChange(null)}
              className="hover:text-(--secondary-red) text-(--primary-red)/80"
            >
              <FontAwesomeIcon icon={["far", "trash-can"]} />
            </Buttonize>
          )}
        </div>

        <select
          className="h-10 rounded-[10px] border border-(--terciary-grey) bg-white px-2 text-style__small-text focus:outline-none"
          value={assetAddMode ?? ""}
          onChange={(event) =>
            handleAssetAddMode((event.target.value || null) as AssetAddMode)
          }
        >
          <option value="">Select action</option>
          <option value="existing">Link existing</option>
          <option value="new">Upload new</option>
        </select>

        <div className="min-w-0 flex-[2]">
          {assetAddMode === "existing" && (
            <AssetLookUp
              label="Paste an existing file id"
              onFindSuccess={() => {
                if (!uploaderState.targetAsset) return;
                linkAsset(uploaderState.targetAsset);
              }}
            />
          )}

          {assetAddMode === "new" && (
            <FileUploader onAssetUploaded={(asset) => linkAsset(asset)} />
          )}
        </div>
      </div>
    </div>
  );
}
