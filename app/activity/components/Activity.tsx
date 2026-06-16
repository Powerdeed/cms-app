"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobals } from "@globals";
import { SectionTitle } from "@global components/ui/Title";

import {
  ACTIVITY_PAGE_DATA,
  ACTIVITY_REVIEW_QUEUE,
  ACTIVITY_SECTIONS,
  ACTIVITY_STATS,
  ACTIVITY_TIMELINE,
} from "../constants/PAGE_DATA";

export default function Activity() {
  const {
    globalStates: { user },
  } = useGlobals();
  const activitySummary = user?.activitySummary;
  const activityStats = [
    {
      ...ACTIVITY_STATS[0],
      value: `${activitySummary?.editsThisWeek ?? 38} edits`,
    },
    {
      ...ACTIVITY_STATS[1],
      value: String(activitySummary?.pendingReviews ?? 7),
    },
    {
      ...ACTIVITY_STATS[2],
      value: String(activitySummary?.uploadsChecked ?? 24),
    },
    {
      ...ACTIVITY_STATS[3],
      value: `${activitySummary?.publishingStreakDays ?? 5} days`,
    },
  ];

  return (
    <main className="uniform-page-display">
      <SectionTitle
        title={ACTIVITY_PAGE_DATA.heading}
        subtitle={ACTIVITY_PAGE_DATA.subheading}
      />

      <section className="grid gap-5 md:grid-cols-4">
        {activityStats.map((stat) => (
          <div key={stat.label} className="feature-container-horizontal">
            <div className="flex-1">
              <div className="text-style__body text-(--primary-grey)">
                {stat.label}
              </div>
              <div className="text-style__heading text-(--primary-blue)">
                {stat.value}
              </div>
              <div className={`text-style__small-text ${stat.tone}`}>
                {stat.change}
              </div>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-(--terciary-grey)/50 text-(--secondary-blue)">
              <FontAwesomeIcon icon={["fas", "chart-line"]} />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="feature-container-vertical">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-style__subheading text-(--primary-blue)">
                Operator Timeline
              </div>
              <div className="text-style__body text-(--primary-grey)">
                Recent profile-owned activity moved out of the profile page.
              </div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-(--primary-yellow)/40 text-(--primary-blue)">
              <FontAwesomeIcon icon={["fas", "chart-line"]} />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {ACTIVITY_TIMELINE.map((activity, index) => (
              <div key={activity.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-(--primary-blue) text-white text-style__small-text">
                    {index + 1}
                  </div>
                  {index !== ACTIVITY_TIMELINE.length - 1 && (
                    <div className="h-full w-px bg-(--terciary-grey)"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="text-style__big-text text-(--primary-blue)">
                      {activity.title}
                    </div>
                    <div className="text-style__small-text text-(--primary-grey)">
                      {activity.time}
                    </div>
                  </div>
                  <div className="mb-1 text-style__body text-(--primary-grey)">
                    {activity.detail}
                  </div>
                  <span className="rounded-border border-(--secondary-blue)/30 bg-(--secondary-blue)/10 text-(--secondary-blue) text-style__small-text">
                    {activity.section}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Section Impact
            </div>
            <div className="text-style__body text-(--primary-grey)">
              Where this operator has spent the most command-center effort.
            </div>
          </div>

          <div className="grid gap-3">
            {ACTIVITY_SECTIONS.map((section) => (
              <div key={section.label}>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <div className="text-style__body--bold text-(--primary-blue)">
                    {section.label}
                  </div>
                  <div className="text-style__small-text text-(--primary-grey)">
                    {section.value}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-(--terciary-grey)/50">
                  <div
                    className={`h-full rounded-full bg-(--secondary-blue) ${section.width}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Review Queue
            </div>
            <div className="text-style__body text-(--primary-grey)">
              Activity-driven follow-ups that should stay visible.
            </div>
          </div>

          {ACTIVITY_REVIEW_QUEUE.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-[10px] border border-(--terciary-grey) p-3"
            >
              <div className="grid h-7 w-7 place-items-center rounded-full bg-(--primary-yellow)/30 text-(--primary-blue)">
                <FontAwesomeIcon icon={["fas", "list-check"]} />
              </div>
              <div className="text-style__body">{item}</div>
            </div>
          ))}
        </div>

        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Activity Filters
            </div>
            <div className="text-style__body text-(--primary-grey)">
              Front-end filter controls ready for when activity search is backed
              by the API.
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-3">
            {[
              "All activity",
              "Content",
              "Assets",
              "Security",
              "Projects",
              "Services",
            ].map((filter) => (
              <button
                key={filter}
                type="button"
                className="rounded-[10px] border border-(--terciary-grey) bg-white px-3 py-2 text-style__small-text text-(--primary-blue) duration-200 hover:bg-background"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
