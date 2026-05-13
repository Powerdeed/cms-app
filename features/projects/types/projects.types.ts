import { companyServices } from "@lib/constants/COMPANY_PROVISIONS";
import { AssetLink } from "@global components/layout/fileUploader";

export type ProjectFeaturedImage = "" | string | AssetLink;

export interface FetchedProject {
  _id: string;
  category: (typeof companyServices)[number];
  name: string;
  featuredImage: ProjectFeaturedImage;
  images: AssetLink[];
  description: string;
  status: "Ongoing" | "Completed";
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  category: (typeof companyServices)[number];
  name: string;
  featuredImage: ProjectFeaturedImage;
  images: AssetLink[];
  description: string;
  status: "Ongoing" | "Completed";
  featured: boolean;
}

export interface CategorizedProjects {
  [key: Project["category"]]: Project[];
}
