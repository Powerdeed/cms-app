"use client";

import { useContext, useEffect } from "react";

import { isEqual } from "lodash";

import { projectContext } from "../context/projectsContext";

import { Project } from "../types/projects.types";
import {
  Asset,
  AssetLink,
  FileMetadataContext,
  addAssetLink,
  removeAssetLink,
  useAssetFeatureLinks,
} from "@global components/layout/fileUploader";

export default function useProjectsEdit() {
  const pContext = useContext(projectContext);
  const fileMetadataState = useContext(FileMetadataContext);
  const { resetAssetLinkingState } = useAssetFeatureLinks();

  if (!pContext || !fileMetadataState)
    throw new Error("projects context must be within a provider");

  const {
    selectedProjectPrev,
    setSelectedProject,
    setSelectedProjectPrev,
    isNewProject,
    setisNewProject,
    featuredState,
    setFeaturedState,
    completedState,
    setCompletedState,
    setHasProjectChanged,
  } = pContext;

  const handleSelectedProject = (p: Project) => {
    setisNewProject(false);
    setSelectedProject(p);
    setSelectedProjectPrev(p);
    setFeaturedState(p.featured);
    setCompletedState(p.status === "Completed" ? true : false);
  };

  const addImageLinkToProject = (asset: Asset) => {
    setSelectedProject((prev) => {
      if (!prev) return prev;

      return { ...prev, images: addAssetLink(prev.images, asset) };
    });

    resetAssetLinkingState();
  };

  // Existing images only update the project draft. Asset references are rebuilt
  // by the backend after the project is saved.
  const linkExistingProjectImage = () => {
    if (!fileMetadataState.targetAsset) return;

    addImageLinkToProject(fileMetadataState.targetAsset);
  };

  const linkUploadedProjectImage = (asset: Asset) => {
    addImageLinkToProject(asset);
  };

  const removeProjectImage = (assetId: string) => {
    setSelectedProject((prev) => {
      if (!prev) return prev;

      return { ...prev, images: removeAssetLink(prev.images, assetId) };
    });

    resetAssetLinkingState();
  };

  const updateByPath = (
    path: Array<keyof Project | number>,
    value: boolean | string | AssetLink | Record<string, string>,
  ) =>
    setSelectedProject((prev) => {
      if (!prev) return prev;

      const clone: Project = structuredClone(prev);

      let current: unknown = clone;

      for (let i = 0; i < path.length - 1; i++) {
        current = (
          current as Record<
            string | number,
            string | AssetLink | Record<string, string>
          >
        )[path[i] as string];
      }

      (
        current as Record<
          string | number,
          boolean | string | AssetLink | Record<string, string>
        >
      )[path[path.length - 1] as string] = value;

      setHasProjectChanged(
        !isNewProject && !isEqual(selectedProjectPrev, clone),
      );

      return clone;
    });

  useEffect(() => {
    const handleFeaturedProject = () =>
      setSelectedProject((proj) =>
        proj
          ? {
              ...proj,
              featured: featuredState,
              status: completedState ? "Completed" : "Ongoing",
            }
          : proj,
      );

    handleFeaturedProject();
  }, [featuredState, completedState, setSelectedProject]);

  return {
    updateByPath,
    handleSelectedProject,
    linkExistingProjectImage,
    linkUploadedProjectImage,
    removeProjectImage,
  };
}
