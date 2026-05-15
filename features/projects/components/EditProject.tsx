"use client";

import { useEffect, useState } from "react";

import Button, { ButtonRed, DeleteIconBtn } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import Toggle from "@global components/ui/Toggle";
import { InputArea } from "@global components/layout/FormWrapper";

import useProjects from "../hooks/useProjects";

import { companyServices } from "@lib/constants/COMPANY_PROVISIONS";
import {
  AssetLookUp,
  getFeaturedImageLinkId,
  FileUploader,
  isFeaturedImageLink,
  RenderAsset,
  useFileUploader,
} from "@global components/layout/fileUploader";
import { truncateTxt } from "@globals";

export default function EditProject() {
  const { state, actions } = useProjects();
  const { uploaderState, uploaderActions } = useFileUploader();
  const { setAssetMode, setDefaultIsPublic, setTargetFileTypes } =
    uploaderState;
  const { pathSetter, updatePathSetters } = uploaderActions;
  const hasSelectedProject = Boolean(state.selectedProject);
  const selectedProjectName = state.selectedProject?.name ?? "";
  const [assetAddMode, setAssetAddMode] = useState<"existing" | "new" | null>(
    null,
  );
  const [assetTarget, setAssetTarget] = useState<"featuredImage" | "gallery">(
    "gallery",
  );

  const openAssetAddMode = (
    mode: "existing" | "new",
    target: "featuredImage" | "gallery",
  ) => {
    if (assetAddMode === mode && assetTarget === target) {
      setAssetAddMode(null);
      uploaderActions.resetAssetLinkingState();
      return;
    }

    setAssetAddMode(mode);
    setAssetTarget(target);

    if (mode === "new") {
      uploaderActions.handleTargetAsset("new");
      return;
    }

    uploaderActions.resetAssetLinkingState();
  };

  useEffect(() => {
    if (!hasSelectedProject) return;

    const uploadPath = `projects/${state.selectedCategory}/${selectedProjectName}`;

    setTargetFileTypes(["image"]);
    setDefaultIsPublic(true);
    pathSetter(uploadPath);
    updatePathSetters(undefined, uploadPath);
    setAssetMode(null);
  }, [
    hasSelectedProject,
    pathSetter,
    selectedProjectName,
    setAssetMode,
    setDefaultIsPublic,
    setTargetFileTypes,
    state.selectedCategory,
    updatePathSetters,
  ]);

  if (!state.selectedProject) return;

  return (
    <div
      className={`flex-1 vertical-layout__outer ${state.hasProjectChanged && "border-2 border-(--secondary-blue) rounded-[10px]"}`}
    >
      <div className="feature-container-vertical text-style__body">
        {state.hasProjectChanged && (
          <div className="text-(--secondary-blue) text-style__small-text">
            Changes have been made, save before exiting
          </div>
        )}

        <div className="text-style__subheading">
          {state.isNewProject ? "Add New Project" : "Edit Project"}
        </div>

        <InputArea
          label="Project Name"
          val={state.selectedProject.name}
          changeFunc={(val) => actions.updateByPath(["name"], val)}
        />

        <InputArea
          label="Description"
          val={state.selectedProject.description}
          changeFunc={(val) => actions.updateByPath(["description"], val)}
        />

        <div className="text-style__body">
          Select category
          <div className="wrapped-input-style">
            <select
              className="w-full h-full rounded-[10px] focus:outline-none"
              value={state.selectedProject.category}
              onChange={(e) =>
                actions.updateByPath(["category"], e.target.value)
              }
            >
              <option value="">select category</option>

              {companyServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 text-style__body">
          Featured Image
          {state.selectedProject.featuredImage ? (
            <div className="flex items-center gap-2.5">
              <div
                className="flex-1 overflow-hidden rounded-[10px] bg-(--secondary-grey)/30 hover:bg-(--secondary-grey)/50 duration-300"
                onClick={() => {
                  if (
                    isFeaturedImageLink(state.selectedProject?.featuredImage)
                  ) {
                    uploaderState.setSelectedAssetId(
                      getFeaturedImageLinkId(
                        state.selectedProject.featuredImage,
                      ),
                    );
                  }
                }}
              >
                {isFeaturedImageLink(state.selectedProject.featuredImage) ? (
                  <div className="relative h-40">
                    <RenderAsset asset={state.selectedProject.featuredImage} />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-white text-style__small-text">
                      {truncateTxt(
                        state.selectedProject.featuredImage.fileName,
                        100,
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-2">
                    {state.selectedProject.featuredImage}
                  </div>
                )}
              </div>

              <DeleteIconBtn deleteFunc={actions.removeProjectFeaturedImage} />
            </div>
          ) : (
            <div className="text-style__small-text text-(--secondary-grey)">
              No featured image selected
            </div>
          )}
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              buttonText="Replace using existing media"
              clickAction={() => openAssetAddMode("existing", "featuredImage")}
            />

            <Button
              buttonText="Upload new media to replace"
              clickAction={() => openAssetAddMode("new", "featuredImage")}
            />
          </div>
          {assetTarget === "featuredImage" && assetAddMode === "existing" && (
            <AssetLookUp
              label="Paste an existing file id"
              onFindSuccess={() => {
                actions.linkExistingProjectFeaturedImage();
                setAssetAddMode(null);
              }}
            />
          )}
          {assetTarget === "featuredImage" && assetAddMode === "new" && (
            <FileUploader
              onAssetUploaded={(asset) => {
                actions.linkUploadedProjectFeaturedImage(asset);
                setAssetAddMode(null);
              }}
            />
          )}
        </div>

        <div className="flex flex-col gap-2.5 text-style__body">
          Gallery
          {state.selectedProject.gallery.length > 0 ? (
            <div className="grid max-h-90 grid-cols-2 gap-2.5 overflow-y-auto pr-1">
              {state.selectedProject.gallery.map((image) => (
                <div
                  key={image[0]}
                  className="group relative h-40 cursor-pointer overflow-hidden rounded-[10px] border border-(--secondary-grey)/30 bg-(--secondary-grey)/10"
                  onClick={() => uploaderState.setSelectedAssetId(image[0])}
                >
                  <RenderAsset asset={image} />

                  <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 bg-black/60 p-2 text-white transition-transform duration-300 group-hover:translate-y-0">
                    <div className="min-w-0 flex-1 text-style__small-text">
                      {truncateTxt(image[1], 100)}
                    </div>

                    <div onClick={(event) => event.stopPropagation()}>
                      <DeleteIconBtn
                        deleteFunc={() => actions.removeProjectImage(image[0])}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-style__small-text text-(--secondary-grey)">
              No gallery media selected
            </div>
          )}
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              buttonText="Add from existing media"
              clickAction={() => openAssetAddMode("existing", "gallery")}
            />

            <Button
              buttonText="Upload new media"
              clickAction={() => openAssetAddMode("new", "gallery")}
            />
          </div>
          {assetTarget === "gallery" && assetAddMode === "existing" && (
            <AssetLookUp
              label="Paste an existing file id"
              onFindSuccess={() => {
                actions.linkExistingProjectImage();
                setAssetAddMode(null);
              }}
            />
          )}
          {assetTarget === "gallery" && assetAddMode === "new" && (
            <FileUploader
              onAssetUploaded={(asset) => {
                actions.linkUploadedProjectImage(asset);
                setAssetAddMode(null);
              }}
            />
          )}
        </div>

        {["featured", "completed"].map((setter) => (
          <div key={setter} className="flex">
            <div className="flex-1">Set as {setter}</div>

            <Toggle
              state={
                setter === "featured"
                  ? state.featuredState
                  : state.completedState
              }
              stateSetter={
                setter === "featured"
                  ? state.setFeaturedState
                  : state.setCompletedState
              }
            />
          </div>
        ))}

        <div className="flex justify-between">
          <div className="flex gap-2.5 items-center">
            <Button
              buttonText={state.isNewProject ? "Add Project" : "Save Changes"}
              clickAction={
                state.isNewProject
                  ? actions.handleAddNewProject
                  : actions.handleUpdateProject
              }
              disabled={state.isUploading || state.isDeleting}
            />
            {state.isUploading && <Loader />}
          </div>

          <div className="flex gap-2.5 items-center">
            <ButtonRed
              buttonText={state.isNewProject ? "Cancel" : "Delete Project"}
              clickAction={
                state.isNewProject
                  ? actions.resetStates
                  : actions.handleDeleteProject
              }
              disabled={state.isUploading || state.isDeleting}
            />
            {state.isDeleting && <Loader />}
          </div>
        </div>

        {state.error && (
          <div className="text-(--primary-red)">
            {state.error}
            {state.error.includes("validation error") &&
              `: one or more fields is missing.`}
          </div>
        )}
      </div>
    </div>
  );
}
