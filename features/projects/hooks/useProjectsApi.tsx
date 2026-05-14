"use client";

import { useContext, useEffect } from "react";

import { projectContext } from "../context/projectsContext";

import {
  createProject,
  deleteProject,
  formattedProjectData,
  getProjects,
  updateProject,
} from "../services/projects";

import { Project } from "../types/projects.types";

import { execute } from "@lib/api/execute";
import { ApiError } from "@lib/api/utils/apiError";

import { DEFAULT_PROJECT } from "../constants/defaultProject";

export default function useProjectsApi() {
  const statesContext = useContext(projectContext);

  if (!statesContext) throw new Error("context must be within a provider");

  const {
    selectedProject,
    setSelectedProject,
    setSelectedProjectPrev,
    selectedCategory,
    setProjects,
    setisNewProject,
    setFeaturedState,
    setCompletedState,
    setGetProjectsError,
    setError,
    setIsUploading,
    setIsDeleting,
    refreshProjects,
    setRefreshProjects,
    setHasProjectChanged,
  } = statesContext;

  useEffect(() => {
    const getAllProjects = async () => {
      setGetProjectsError("");

      try {
        const projects: Project[] = await getProjects();

        setProjects(formattedProjectData(projects));
      } catch (error) {
        if (error instanceof ApiError) setGetProjectsError(error.message);
      }
    };

    getAllProjects();
  }, [refreshProjects, setGetProjectsError, setProjects]);

  const resetStates = (reason?: "new") => {
    setSelectedProject(reason === "new" ? DEFAULT_PROJECT : null);
    setSelectedProjectPrev(reason === "new" ? DEFAULT_PROJECT : null);
    setisNewProject(reason === "new" ? true : false);
    setFeaturedState(false);
    setCompletedState(false);
    setHasProjectChanged(false);
  };

  const handleAddNewProject = async () => {
    if (!selectedProject) return;

    await execute(() => createProject(selectedProject), {
      setLoading: setIsUploading,
      setError,
      onSuccess: (newProject) => {
        setProjects((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            [selectedCategory]: [...prev[selectedCategory], newProject],
          };
        });

        resetStates("new");
        setRefreshProjects((prev) => !prev);
        setHasProjectChanged(false);
      },
    });
  };

  const handleUpdateProject = async () => {
    if (!selectedProject) return;

    await execute(() => updateProject(selectedProject._id, selectedProject), {
      setLoading: setIsUploading,
      setError,
      onSuccess: (updatedProject) => {
        setProjects((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            [selectedCategory]: prev[selectedCategory].map((p) =>
              p._id === selectedProject._id ? updatedProject : p,
            ),
          };
        });

        setSelectedProjectPrev(updatedProject);
        setRefreshProjects((prev) => !prev);
        setHasProjectChanged(false);
      },
    });
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;

    await execute(() => deleteProject(selectedProject._id), {
      setLoading: setIsDeleting,
      setError,
      onSuccess: () => {
        setProjects((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            [selectedCategory]: prev[selectedCategory].filter(
              (p) => p._id !== selectedProject._id,
            ),
          };
        });
        setRefreshProjects((prev) => !prev);
        setHasProjectChanged(false);

        resetStates();
      },
    });
  };

  return {
    resetStates,
    handleAddNewProject,
    handleUpdateProject,
    handleDeleteProject,
  };
}
