"use client";

import { useEffect, useRef } from "react";

import Button, { ButtonRed, DeleteIconBtn } from "@global components/ui/Button";
import Loader from "@global components/ui/Loader";
import Toggle from "@global components/ui/Toggle";
import { InputArea } from "@global components/layout/FormWrapper";

import useProjects from "../hooks/useProjects";

import { companyServices } from "@lib/constants/COMPANY_PROVISIONS";
import {
  AssetRef,
  FileUploader,
  useFileUploader,
} from "@global components/layout/fileUploader";

export default function EditProject() {
  const { state, actions } = useProjects();
  const { uploaderState, uploaderActions } = useFileUploader();
  const {
    setAssetMode,
    setAssetRef,
    setDefaultIsPublic,
    setTargetFileTypes,
  } = uploaderState;
  const { pathSetter, updatePathSetters } = uploaderActions;
  const updateProjectByPathRef = useRef(actions.updateByPath);
  const hasSelectedProject = Boolean(state.selectedProject);
  const selectedProjectName = state.selectedProject?.name ?? "";
  const selectedProjectImageCount = state.selectedProject?.images.length ?? 0;

  useEffect(() => {
    updateProjectByPathRef.current = actions.updateByPath;
  }, [actions.updateByPath]);

  useEffect(() => {
    if (!hasSelectedProject) return;

    const uploadPath = `projects/${state.selectedCategory}/${selectedProjectName}`;

    setTargetFileTypes(["image"]);
    setDefaultIsPublic(true);
    setAssetRef(
      () => (val: AssetRef) =>
        updateProjectByPathRef.current(
          ["images", selectedProjectImageCount],
          val,
        ),
    );
    pathSetter(uploadPath);
    updatePathSetters(undefined, uploadPath);
    setAssetMode("new");
  }, [
    hasSelectedProject,
    pathSetter,
    selectedProjectImageCount,
    selectedProjectName,
    setAssetMode,
    setAssetRef,
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

        <InputArea
          label="Featured Image"
          val={state.selectedProject.featuredImage}
          changeFunc={(val) => actions.updateByPath(["featuredImage"], val)}
        />

        <div className="flex flex-col gap-2.5 text-style__body">
          Images
          {state.selectedProject.images.map((image, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <input
                type="text"
                className="w-full input-style text-style__body mt-1"
                value={image[1]}
                onChange={(e) =>
                  actions.updateByPath(["images", index], [
                    image[0],
                    e.target.value,
                  ])
                }
              />
              <DeleteIconBtn
                deleteFunc={() =>
                  state.setSelectedProject((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      ["images"]: prev.images.filter((_, i) => i !== index),
                    };
                  })
                }
              />
            </div>
          ))}
          <FileUploader />
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
            />
            {state.isDeleting && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
}
