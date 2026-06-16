"use client";

import { SectionTitle } from "@global components/ui/Title";

const pageMeta = {
  title: "Articles & Insights",
  subtitle: "Supporting content for the website",
};

export default function ArticlesAndInsights() {
  return (
    <div className="uniform-page-display">
      <SectionTitle title={pageMeta.title} subtitle={pageMeta.subtitle} />

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5">
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]"></div>
        <div className="flex-1 p-2.5 md:p-5 flex flex-col gap-2.5 md:gap-5 bg-white border border-(--terciary-grey) rounded-[10px]"></div>
      </div>
    </div>
  );
}
