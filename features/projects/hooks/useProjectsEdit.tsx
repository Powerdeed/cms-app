"use client";

import { useContext, useEffect } from "react";

import { isEqual } from "lodash";

import { projectContext } from "../context/projectsContext";

import { Project } from "../types/projects.types";
import { AssetRef } from "@global components/layout/fileUploader";

export default function useProjectsEdit() {
  const pContext = useContext(projectContext);

  if (!pContext) throw new Error("projects context must be within a provider");

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

  const updateByPath = (
    path: Array<keyof Project | number>,
    value: boolean | string | AssetRef | Record<string, string>,
  ) =>
    setSelectedProject((prev) => {
      if (!prev) return prev;

      const clone: Project = structuredClone(prev);

      let current: unknown = clone;

      for (let i = 0; i < path.length - 1; i++) {
        current = (
          current as Record<
            string | number,
            string | AssetRef | Record<string, string>
          >
        )[path[i] as string];
      }

      (
        current as Record<
          string | number,
          boolean | string | AssetRef | Record<string, string>
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
  };
}
