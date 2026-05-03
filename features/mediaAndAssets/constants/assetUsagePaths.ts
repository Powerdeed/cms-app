import { apiRequest } from "@lib/api/apiRequest";
import { companyServices } from "@lib/constants/COMPANY_PROVISIONS";
import { AssetUsagePaths } from "@global components/layout/fileUploader";

export type { AssetUsagePaths };

type ProjectUsagePath = {
  category: string;
  name: string;
};

type CompanyStructureUsagePath = {
  levelName: string;
  positions: string[];
};

export const usagePaths: Promise<AssetUsagePaths> = (async () => {
  const companyStructure = await apiRequest<{
    structure: CompanyStructureUsagePath[];
  }>({
    method: "GET",
    url: "/company-structure",
  });
  const projects = await apiRequest<ProjectUsagePath[]>({
    method: "GET",
    url: "/projects",
  });

  return {
    "home page": ["Hero", "about top", "about bottom"],
    services: companyServices,
    "about structure": (companyStructure.structure || []).flatMap(
      ({ levelName, positions }) =>
        positions.map((position) => `${levelName}-${position}`),
    ),
    "about certificates": [],
    projects: (projects || []).map(
      ({ category, name }) => `${category}-${name}`,
    ),
    "contact page": ["Hero"],
  };
})();
