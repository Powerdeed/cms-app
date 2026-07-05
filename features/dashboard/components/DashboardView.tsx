"use client";

import { useMemo } from "react";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getRelativeDateFormatted } from "@globals";

import { getDashboardStats } from "../utils/stats";
import { matchCollectionToSection } from "../utils/matchCollectionToSection";
import { getAvailableInquiryTrendYears } from "../utils/getInquiryTrendsFromInquiries";
import { getRecentActivities } from "../utils/getRecentActivities";

import { SectionTitle } from "@global components/ui/Title";
import ErrorMessage from "@global components/ui/ErrorMessage";

import { VISIBLE_COUNT_INCREMENT } from "../constants/visibleCountIncrement";
import { SECTION_ACCENT_COLORS } from "../constants/sectionAccentColors";
import { PAGE_META_DATA } from "../constants/PageMetaData";

import { Inquiry, InquiryTrendRange } from "../types/inquiries.types";
import { Activities } from "../types/activities.types";

import useOverview from "../hooks/useDashboard";

export function DashboardView() {
  const { state, graphs } = useOverview();
  const inquiries = state.inquiries as Inquiry[];
  const activities = state.activities as Activities[];
  const stats = useMemo(
    () => getDashboardStats(inquiries, activities),
    [activities, inquiries],
  );
  const recentActivities = useMemo(
    () => getRecentActivities(activities, inquiries),
    [activities, inquiries],
  );
  const visibleRecentActivities = recentActivities.slice(0, state.visibleCount);
  const inquiryTrendRangeOptions = useMemo(() => {
    const yearOptions = getAvailableInquiryTrendYears(state.inquiryTrends).map(
      (year) => ({
        label: String(year),
        value: String(year) as InquiryTrendRange,
      }),
    );

    return [
      { label: "Last month", value: "last-month" as const },
      { label: "Last 6 months", value: "last-6-months" as const },
      { label: "Current year", value: "current-year" as const },
      ...yearOptions.sort((a, b) => Number(b.value) - Number(a.value)),
    ];
  }, [state.inquiryTrends]);

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
              <div className={`${getStatChangeColor(stat.changeDirection)}`}>
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
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <div className="text-style__body">Inquiry Trends</div>

            <select
              value={state.selectedInquiryTrendRange}
              onChange={(event) =>
                state.setSelectedInquiryTrendRange(
                  event.target.value as InquiryTrendRange,
                )
              }
              className="rounded-lg border border-(--terciary-grey) bg-white px-2 py-1 text-style__small-text outline-none"
            >
              {inquiryTrendRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="h-80">
            <graphs.LineGraph />
          </div>
        </div>

        <div className="h-100 pb-10 feature-container-vertical">
          <div className="text-style__body mb-2.5 w-full h-fit text-left">
            Lead Sources
          </div>

          <div className="h-80">
            <graphs.PieDoughnut />
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div className="feature-container-vertical text-style__body">
        <div className="text-style__subheading">Recent Activity</div>

        {state.fetchingActivitiesError && (
          <ErrorMessage
            error={`Failed to fetch audit activities: ${state.fetchingActivitiesError}`}
            customStyles="text-style__body"
          />
        )}

        {state.fetchingInquiriesError && (
          <ErrorMessage
            error={`Failed to fetch inquiry activities: ${state.fetchingInquiriesError}`}
            customStyles="text-style__body"
          />
        )}

        {recentActivities.length === 0 && (
          <div className="text-style__small-text text-(--primary-grey)">
            No recent activity yet
          </div>
        )}

        {visibleRecentActivities.map((activity, index) => {
          const getColors = () => {
            const section = matchCollectionToSection(activity.collection);

            if (section === null || section === "general") {
              return {
                background: "bg-(--primary-blue)",
                text: "text-(--primary-blue)",
              };
            } else return SECTION_ACCENT_COLORS[section];
          };

          return (
            <div
              key={activity._id}
              className={`${index === visibleRecentActivities.length - 1 ? "" : "border-b border-(--terciary-grey)"} flex gap-2.5 items-center py-2.5`}
            >
              <div
                className={`w-2 h-2 rounded-full ${getColors().background} ${getColors().text}`}
              ></div>
              <div>
                <div>{activity.action}</div>

                <div className="text-style__small-text">
                  {getRelativeDateFormatted(activity.createdAt.toString())}
                </div>
              </div>
            </div>
          );
        })}

        {state.visibleCount < recentActivities.length && (
          <div
            className="text-style__small-text text-(--primary-blue) cursor-pointer hover:underline self-start"
            onClick={() =>
              state.setVisibleCount(
                state.visibleCount + VISIBLE_COUNT_INCREMENT,
              )
            }
          >
            view more
          </div>
        )}
      </div>
    </main>
  );
}

function getStatChangeColor(changeDirection: "up" | "down" | "neutral") {
  if (changeDirection === "up") return "text-(--primary-green)";
  if (changeDirection === "down") return "text-(--primary-red)";

  return "text-(--primary-grey)";
}
