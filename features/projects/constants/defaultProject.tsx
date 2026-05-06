import { Project } from "../types/projects.types";

export const DEFAULT_PROJECT: Project = {
  _id: crypto.randomUUID(),
  category: "",
  name: "",
  description: "",
  featuredImage: "",
  images: [],
  status: "Ongoing",
  featured: false,
};
