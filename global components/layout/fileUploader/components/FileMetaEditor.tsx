"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import useFileUploader from "../hooks/useFileUploader";
import { AssetUsagePaths } from "../types/asset.types";
import { assetRoles } from "../constants/assetRoles";

export default function FileMetaEditor() {
  const { uploaderState, uploaderActions } = useFileUploader();
  const targetAsset = uploaderState.targetAsset;

  if (!targetAsset) return null;

  const fileExtension = uploaderState.fileName.includes(".")
    ? `.${uploaderState.fileName.split(".").pop()}`
    : "";
  const assetPath = targetAsset.storage?.objectName ?? "";
  const primaryRelationship = targetAsset.relationships?.[0];
  const updateDisplayField = (field: "alt" | "caption", value: string) => {
    uploaderState.setTargetAsset((prev) =>
      prev
        ? {
            ...prev,
            display: {
              alt: prev.display?.alt ?? "",
              caption: prev.display?.caption ?? "",
              title: prev.display?.title ?? "",
              [field]: value,
            },
            updatedAt: new Date().toISOString(),
          }
        : prev,
    );
  };
  const updateRelationshipRole = (role: string) => {
    uploaderState.setTargetAsset((prev) =>
      prev
        ? {
            ...prev,
            relationships: (prev.relationships?.length
              ? prev.relationships
              : [
                  {
                    entityType: prev.classification?.category ?? "",
                    entityId: "",
                    field: "",
                    role: "",
                  },
                ]
            ).map((relationship, index) =>
              index === 0 ? { ...relationship, role } : relationship,
            ),
            updatedAt: new Date().toISOString(),
          }
        : prev,
    );
  };
  const fieldsToReview = [
    ["assetType", targetAsset.assetType],
    ["size", targetAsset.size],
    ["objectName", assetPath],
    ["mimeType", targetAsset.mimeType],
  ];

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await uploaderActions.fileUploadingHandler();
      }}
      className="feature-container-vertical h-fit text-style__body"
    >
      {"Edit file meta data before uploading (areas with '*' must be updated)."}

      <div className="grid grid-cols-2 gap-2.5">
        {fieldsToReview.map(([key, value]) => (
          <MetaWrapper key={key} meta={String(key)} val={String(value ?? "")}>
            {key === "objectName" && (
              <FontAwesomeIcon
                icon={["fas", uploaderState.copying ? "check" : "copy"]}
                className="cursor-pointer"
                onClick={() => uploaderActions.handleCopyAssetPath(assetPath)}
              />
            )}
          </MetaWrapper>
        ))}

        <div className="flex gap-2.5 items-center">
          <div className="w-55">
            name (optional)<span className="text-(--primary-red)">*</span>:
          </div>

          <textarea
            placeholder="Rename file"
            value={uploaderState.fileName.split(".").slice(0, -1).join(".")}
            onChange={(e) =>
              uploaderState.setFileName(`${e.target.value}${fileExtension}`)
            }
            className="w-full input-style field-sizing-content"
          />
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="w-55">
            select category<span className="text-(--primary-red)">*</span>:
          </div>

          <select
            value={uploaderState.assetCategory}
            onChange={(e) => {
              uploaderState.setAssetCategory(e.target.value);
              uploaderActions.getFirstPaths(
                e.target.value as keyof AssetUsagePaths,
              );
            }}
            className="input-style w-full"
          >
            <option value="" disabled>
              select category
            </option>

            {Object.keys(uploaderState.assetUsagePaths || {}).map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      <div className="flex gap-2.5 items-center">
        <div className="w-33">
          usage<span className="text-(--primary-red)">*</span>:
        </div>

        {uploaderState.firstPathArr ? (
          uploaderState.firstPathArr.length > 0 ? (
            <div className="w-full flex gap-2.5 items-center">
              <select
                value={uploaderState.firstPath}
                onChange={(e) => {
                  uploaderState.setFirstPath(e.target.value);
                  uploaderState.setSecondPath("");
                }}
                className="input-style w-full"
              >
                <option value={undefined}>select specific location</option>

                {[...new Set(uploaderState.firstPathArr)].map((paths) => (
                  <option key={paths} value={paths}>
                    {paths}
                  </option>
                ))}
              </select>

              {uploaderState.firstPath &&
                uploaderState.secondPaths.length > 0 && (
                  <select
                    value={uploaderState.secondPath}
                    onChange={(e) =>
                      uploaderState.setSecondPath(e.target.value)
                    }
                    className="input-style w-full"
                  >
                    <option value={undefined}>
                      which {uploaderState.firstPath}?
                    </option>

                    {uploaderState.secondPaths.map((path) => {
                      return (
                        <option key={path} value={path}>
                          {path}
                        </option>
                      );
                    })}
                  </select>
                )}
            </div>
          ) : (
            <div>no path selection needed</div>
          )
        ) : (
          <div>select a category first</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex gap-2.5 items-center">
          <div className="w-55">alt text:</div>

          <textarea
            placeholder="Describe the asset"
            value={targetAsset.display?.alt ?? ""}
            onChange={(e) => updateDisplayField("alt", e.target.value)}
            className="w-full input-style field-sizing-content"
          />
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="w-55">caption:</div>

          <textarea
            placeholder="Optional visible caption"
            value={targetAsset.display?.caption ?? ""}
            onChange={(e) => updateDisplayField("caption", e.target.value)}
            className="w-full input-style field-sizing-content"
          />
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="w-55">role:</div>

          <select
            value={primaryRelationship?.role ?? ""}
            onChange={(e) => updateRelationshipRole(e.target.value)}
            className="input-style w-full"
          >
            <option value="">select role</option>

            {assetRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2.5">
        <Button
          type="submit"
          className="flex-1"
          buttonText={
            uploaderState.assetMode === "new" ? "Upload asset" : "Update asset"
          }
        >
          {uploaderState.uploadingStatus && <Loader />}
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
    </form>
  );
}

function MetaWrapper({
  meta,
  val,
  children,
}: {
  meta: string;
  val: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5 items-center">
      <div className="w-33">{meta}:</div>

      <div className="flex-1 min-h-10 input-style items-center flex gap-2.5">
        <div className="flex-1">{val}</div>
        {children}
      </div>
    </div>
  );
}
