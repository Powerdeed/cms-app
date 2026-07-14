"use client";

// modules
import { use } from "react";

// utils
import { convertLinkToLabel, useGlobals } from "@globals";

// constants
import { MenuLabels } from "@lib/constants/NAV_MENU_AND_LABELS";

// features
import { SettingsAndUsers } from "@features/settingsAndUser";
import { Customization } from "@features/customization";
import { DataAndReports } from "@features/dataAndReports";
import { SchedulingAndVisibility } from "@features/schedulingAndVisiblity";
import { MediaAndAssets } from "@features/mediaAndAssets";
import { ArticlesAndInsights } from "@features/articlesAndInsights";
import { WebsiteContent } from "@features/webisteContent";
import { Projects } from "@features/projects";
import { ServicesManagement } from "@features/servicesManagement";
import { LeadsAndInquiries } from "@features/leadsAndInquiries";
import { Dashboard } from "@features/dashboard";

// component
import { ChartProvider } from "@global components/layout/charts/context/ChartProvider";

export default function Section({
  params,
}: {
  params: Promise<{ section: MenuLabels }>;
}) {
  const { section } = use(params);
  const sectionLabel = convertLinkToLabel(decodeURIComponent(section));
  const { globalStates } = useGlobals();

  const sectionMap: Record<MenuLabels, React.ReactNode> = {
    Dashboard: <Dashboard />,
    "Leads & Inquiries": <LeadsAndInquiries />,
    "Services Management": <ServicesManagement />,
    Projects: <Projects />,
    "Website Content": <WebsiteContent />,
    "Articles & Insights": <ArticlesAndInsights />,
    "Media & Assets": <MediaAndAssets />,
    "Scheduling & Visibility": <SchedulingAndVisibility />,
    "Data & Reports": <DataAndReports />,
    Customization: <Customization />,
    "Settings & Users": <SettingsAndUsers />,
  };

  const content = sectionMap[sectionLabel];

  return (
    <ChartProvider>
      <div
        className={`pt-15 page-with-panels ${globalStates.sideBarOpen ? "pl-65" : "pl-15"}`}
      >
        {content}
      </div>
    </ChartProvider>
  );
}
