"use client";

// modules
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// services
// components
import Button, { ButtonLight } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";

// constants
import { AssetUsagePaths } from "../constants/assetUsagePaths";

import useMediaAssets from "../hooks/useAssets";

export default function AssetMetaEditor() {
  const { state, actions } = useMediaAssets();
  const targetAsset = state.targetAsset;

  if (!targetAsset) return;

  const fileExtension = state.fileName.includes(".")
    ? `.${state.fileName.split(".").pop()}`
    : "";
  const assetPath = targetAsset.storage?.objectName ?? "";
  const fieldsToReview = [
    ["assetType", targetAsset.assetType],
    ["size", targetAsset.size],
    ["objectName", assetPath],
    ["mimeType", targetAsset.mimeType],
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (state.assetMode === "new") {
          actions.handleSubmitMediaAsset(targetAsset);
        } else {
          actions.handleUpdateTargetAsset();
        }
      }}
      className="feature-container-vertical h-fit text-style__body"
    >
      {"Edit file meta data before uploading (areas with '*' must be updated)."}

      <div className="grid grid-cols-2 gap-2.5">
        {fieldsToReview.map(([key, value]) => (
          <MetaWrapper key={key} meta={String(key)} val={String(value ?? "")}>
            {key === "objectName" && (
              <FontAwesomeIcon
                icon={["fas", state.copying ? "check" : "copy"]}
                className="cursor-pointer"
                onClick={() => actions.handleCopyAssetPath(assetPath)}
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
            value={state.fileName.split(".").slice(0, -1).join(".")}
            onChange={(e) =>
              state.setFileName(`${e.target.value}${fileExtension}`)
            }
            className="w-full input-style field-sizing-content"
          />
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="w-55">
            select category<span className="text-(--primary-red)">*</span>:
          </div>

          <select
            value={state.assetCategory}
            onChange={(e) => {
              state.setAssetCategory(e.target.value as keyof AssetUsagePaths);
              actions.getFirstPaths(e.target.value as keyof AssetUsagePaths);
            }}
            className="input-style w-full"
          >
            <option value="" disabled>
              select category
            </option>

            {Object.keys(state.assetUsagePaths || {}).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2.5 items-center">
        <div className="w-33">
          usage<span className="text-(--primary-red)">*</span>:
        </div>

        {state.firstPathArr ? (
          state.firstPathArr.length > 0 ? (
            <div className="w-full flex gap-2.5 items-center">
              <select
                value={state.firstPath}
                onChange={(e) => {
                  state.setFirstPath(e.target.value);
                  state.setSecondPath("");
                }}
                className="input-style w-full"
              >
                <option value={undefined}>select specific location</option>

                {[...new Set(state.firstPathArr)].map((paths) => (
                  <option key={paths} value={paths}>
                    {paths}
                  </option>
                ))}
              </select>

              {state.firstPath && state.secondPaths.length > 0 && (
                <select
                  value={state.secondPath}
                  onChange={(e) => state.setSecondPath(e.target.value)}
                  className="input-style w-full"
                >
                  <option value={undefined}>which {state.firstPath}?</option>

                  {state.secondPaths.map((path) => {
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

      <div className="flex gap-2.5">
        <Button
          type="submit"
          className="flex-1"
          buttonText={
            state.assetMode === "new" ? "Upload asset" : "Update asset"
          }
          clickAction={() => {}}
        >
          {state.uploadingStatus && <Loader />}
        </Button>

        {state.assetMode === "new" && (
          <ButtonLight
            buttonText="re-upload"
            clickAction={() => actions.handleResetAssetStates("re-upload")}
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
