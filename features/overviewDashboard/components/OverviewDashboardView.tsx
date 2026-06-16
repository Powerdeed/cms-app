"use client";

import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { recentActivities, stats } from "@features/overviewDashboard";

import { SectionTitle } from "@global components/ui/Title";

import { VISIBLE_COUNT_INCREMENT } from "../constants/visibleCountIncrement";
import { SECTION_ACCENT_COLORS } from "../constants/sectionAccentColors";
import { PAGE_META_DATA } from "../constants/PageMetaData";

import useOverviewDashboard from "../hooks/useOverviewDashboard";

export function OverviewDashboardView() {
  const { state, graph } = useOverviewDashboard();

  return (
    <main className="uniform-page-display">
      <SectionTitle
        title={PAGE_META_DATA.title}
        subtitle={PAGE_META_DATA.subtitle}
      />

      {/* STATS */}
      <div className="grid grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="feature-container-horizontal">
            <div className="text-style__body">
              <div className="font-medium">{stat.label}</div>
              <div className="text-style__heading">{stat.value}</div>
              <div
                className={`${stat.changeDirection === "up" ? "text-(--primary-green)" : "text-(--primary-red)"}`}
              >
                {stat.change}
              </div>
            </div>
            <div className="bg-(--terciary-grey)/50 p-1 rounded-[10px]">
              <FontAwesomeIcon
                icon={stat.icon as [IconPrefix, IconName]}
                className={`${stat.iconColor}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* CHART TRENDS */}
      <div className="grid grid-cols-2 gap-5">
        <div className="h-100 pb-10 feature-container-vertical">
          <div className="text-style__body mb-2.5">Inquiry Trends</div>
          <div className="h-80">
            <graph.LineGraph />
          </div>
        </div>
        <div className="h-100 pb-10 feature-container-vertical">
          <div className="text-style__body mb-2.5 w-full h-fit text-left">
            Traffic Sources
          </div>
          <div className="h-80">
            <graph.PieDoughnut />
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="feature-container-vertical">
        <div className="text-style__subheading">Recent Activity</div>

        {recentActivities
          .slice(0, state.visibleCount)
          .map((activity, index) => (
            <div
              key={index}
              className={`${index === recentActivities.length - 1 ? "" : "border-b border-(--terciary-grey)"} flex gap-2.5 items-center py-2.5`}
            >
              <div
                className={`w-2 h-2 rounded-full ${SECTION_ACCENT_COLORS[activity.section as keyof typeof SECTION_ACCENT_COLORS].background}`}
              ></div>
              <div>
                <div className="text-style__body">{activity.description}</div>
                <div className="text-style__small-text">{activity.time}</div>
              </div>
            </div>
          ))}

        <div
          className="text-style__small-text text-(--primary-blue) cursor-pointer hover:underline self-start"
          onClick={() =>
            state.setVisibleCount(state.visibleCount + VISIBLE_COUNT_INCREMENT)
          }
        >
          view more
        </div>
      </div>
    </main>
  );
}
