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
  createFeaturedImageLink,
  isFeaturedImageLink,
  removeAssetLink,
  renameAssetLink,
  renameFeaturedImageLink,
  useAssetFeatureLinks,
} from "@global components/layout/fileUploader";
import { globalContext } from "@globals";

export default function useProjectsEdit() {
  const globalState = useContext(globalContext);
  const pContext = useContext(projectContext);
  const fileMetadataState = useContext(FileMetadataContext);
  const { resetAssetLinkingState } = useAssetFeatureLinks();

  if (!pContext || !fileMetadataState || !globalState)
    throw new Error("projects and global context must be within a provider");

  const {
    setSelectedCategory,
    selectedProject,
    setSelectedProject,
    selectedProjectPrev,
    setSelectedProjectPrev,
    isNewProject,
    setisNewProject,
    featuredState,
    setFeaturedState,
    completedState,
    setCompletedState,
    setHasProjectChanged,
  } = pContext;

  const { setUnsavedChanges } = globalState;

  useEffect(() => {
    const hasProjectChanged = !isEqual(selectedProject, selectedProjectPrev);

    setHasProjectChanged(hasProjectChanged);
    setUnsavedChanges(hasProjectChanged);
  }, [
    selectedProject,
    selectedProjectPrev,
    setHasProjectChanged,
    setUnsavedChanges,
  ]);

  const handleSelectedCategory = (category: string) =>
    setSelectedCategory((prev) => (prev === category ? "" : category));

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

      return { ...prev, gallery: addAssetLink(prev.gallery, asset) };
    });

    resetAssetLinkingState();
  };

  // Existing gallery items only update the project draft. Asset references are rebuilt
  // by the backend after the project is saved.
  const linkExistingProjectImage = () => {
    if (!fileMetadataState.targetAsset) return;

    addImageLinkToProject(fileMetadataState.targetAsset);
  };

  const linkUploadedProjectImage = (asset: Asset) => {
    addImageLinkToProject(asset);
  };

  const linkAssetAsFeaturedImage = (asset: Asset) => {
    setSelectedProject((prev) => {
      if (!prev) return prev;

      return { ...prev, featuredImage: createFeaturedImageLink(asset) };
    });

    resetAssetLinkingState();
  };

  const linkExistingProjectFeaturedImage = () => {
    if (!fileMetadataState.targetAsset) return;

    linkAssetAsFeaturedImage(fileMetadataState.targetAsset);
  };

  const linkUploadedProjectFeaturedImage = (asset: Asset) => {
    linkAssetAsFeaturedImage(asset);
  };

  const removeProjectFeaturedImage = () => {
    setSelectedProject((prev) => {
      if (!prev) return prev;

      return { ...prev, featuredImage: "" };
    });

    resetAssetLinkingState();
  };

  const removeProjectImage = (assetId: string) => {
    setSelectedProject((prev) => {
      if (!prev) return prev;

      return { ...prev, gallery: removeAssetLink(prev.gallery, assetId) };
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

  const updateProjectsImageRef = (asset: Asset) =>
    setSelectedProject((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        featuredImage: isFeaturedImageLink(prev.featuredImage)
          ? renameFeaturedImageLink(prev.featuredImage, asset)
          : prev.featuredImage,
        gallery: renameAssetLink(prev.gallery, asset),
      };
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
    handleSelectedCategory,
    handleSelectedProject,
    linkExistingProjectFeaturedImage,
    linkExistingProjectImage,
    linkUploadedProjectFeaturedImage,
    linkUploadedProjectImage,
    removeProjectFeaturedImage,
    removeProjectImage,
    updateProjectsImageRef,
  };
}
