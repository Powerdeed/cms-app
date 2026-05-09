"use client";

// modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import MetaWrapper from "./fileMetaEditor/MetaWrapper";
import EditorField from "./fileMetaEditor/EditorField";

// hooks
import useFileUploader from "../hooks/useFileUploader";

// types
import { Asset } from "../types/asset.types";

import RenderImage from "./fileMetaEditor/RenderImage";
import { sizeOfFile } from "@features/mediaAndAssets";

type FileMetaEditorProps = {
  onAssetUploaded?: (asset: Asset) => void;
  onAssetUpdated?: (asset: Asset) => void;
};

export default function FileMetaEditor({
  onAssetUploaded,
  onAssetUpdated,
}: FileMetaEditorProps = {}) {
  const { uploaderState, uploaderActions } = useFileUploader();
  const targetAsset = uploaderState.targetAsset;

  if (!targetAsset) return null;

  return (
    <form
      onSubmit={(e) =>
        uploaderActions.updateAssetMeta(e, onAssetUploaded, onAssetUpdated)
      }
      onClick={(e) => e.stopPropagation()}
      className="h-100 bg-white rounded-[10px] text-style__body overflow-hidden"
    >
      <div className="grid h-full grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.15fr)] gap-5 p-5">
        <RenderImage />

        <div className="vertical-layout__inner min-h-0 overflow-y-auto pr-2 section-scrollbar">
          <div className="text-style__small-text text-(--secondary-grey)">
            Edit file metadata before uploading. Fields marked with * are
            required.
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
            {uploaderActions.fieldsToReview.map(([key, value]) => (
              <MetaWrapper
                key={key}
                meta={String(key)}
                val={String(
                  key === "size"
                    ? sizeOfFile(value as Asset["size"])
                    : (value ?? ""),
                )}
              >
                {key === "objectName" && (
                  <FontAwesomeIcon
                    icon={["fas", uploaderState.copying ? "check" : "copy"]}
                    className="cursor-pointer"
                    onClick={() =>
                      uploaderActions.handleCopyAssetPath(
                        uploaderActions.assetPath,
                      )
                    }
                  />
                )}
              </MetaWrapper>
            ))}

            <EditorField
              label="name (optional)"
              required
              control={
                <textarea
                  placeholder="Rename file"
                  value={uploaderState.fileName
                    .split(".")
                    .slice(0, -1)
                    .join(".")}
                  onChange={(e) =>
                    uploaderActions.updateFileName(e.target.value)
                  }
                  className="w-full input-style field-sizing-content"
                />
              }
            />

            <EditorField
              label="alt text"
              control={
                <textarea
                  placeholder="Describe the asset"
                  value={targetAsset.display?.alt ?? ""}
                  onChange={(e) =>
                    uploaderActions.updateDisplayField("alt", e.target.value)
                  }
                  className="w-full input-style field-sizing-content"
                />
              }
            />

            <EditorField
              label="caption"
              control={
                <textarea
                  placeholder="Optional visible caption"
                  value={targetAsset.display?.caption ?? ""}
                  onChange={(e) =>
                    uploaderActions.updateDisplayField(
                      "caption",
                      e.target.value,
                    )
                  }
                  className="w-full input-style field-sizing-content"
                />
              }
            />

            <label className="flex gap-2.5 items-center">
              <div className="w-33">public file:</div>

              <input
                type="checkbox"
                checked={targetAsset.isPublic ?? false}
                onChange={(e) =>
                  uploaderActions.updateIsPublic(e.target.checked)
                }
              />

              <div className="text-style__small-text text-(--secondary-grey)">
                use stable public URL
              </div>
            </label>

            <EditorField
              label="references"
              control={
                <div className="flex flex-col gap-1 text-style__small-text text-(--secondary-grey)">
                  {targetAsset.references?.length ? (
                    targetAsset.references.map((reference) => (
                      <div key={reference.id}>
                        {reference.label ||
                          `${reference.category}: ${reference.usage}`}
                      </div>
                    ))
                  ) : (
                    <div>No feature references</div>
                  )}
                </div>
              }
            />
          </div>

          <div className="flex gap-2.5 sticky bottom-0 bg-white pt-2">
            <Button
              type="submit"
              className="flex-1"
              buttonText={
                uploaderState.assetMode === "new"
                  ? "Upload asset"
                  : "Update asset"
              }
            >
              {(uploaderState.uploadingStatus ||
                uploaderState.isAssetUploading) && <Loader />}
            </Button>

            {uploaderState.assetMode === "new" && (
              <ButtonLight
                buttonText="re-upload"
                clickAction={() =>
                  uploaderActions.handleResetAssetStates("re-upload")
                }
              />
            )}
          </div>

          {uploaderState.assetApiOnError && (
            <div>{uploaderState.assetApiOnError}</div>
          )}
        </div>
      </div>
    </form>
  );
}
