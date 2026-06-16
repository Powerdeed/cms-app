"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobals } from "@globals";
import { SectionTitle } from "@global components/ui/Title";

import {
  SETTINGS_GROUPS,
  SETTINGS_PAGE_DATA,
  SETTINGS_SHORTCUTS,
} from "../constants/PAGE_DATA";

export default function Settings() {
  const {
    globalStates: { user },
  } = useGlobals();

  return (
    <main className="uniform-page-display">
      <SectionTitle
        title={SETTINGS_PAGE_DATA.heading}
        subtitle={SETTINGS_PAGE_DATA.subheading}
      />

      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="feature-container-vertical">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-style__subheading text-(--primary-blue)">
                Workspace Behavior
              </div>
              <div className="text-style__body text-(--primary-grey)">
                These settings belong to the signed-in operator, not the whole
                organization.
              </div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-(--primary-yellow)/40 text-(--primary-blue)">
              <FontAwesomeIcon icon={["fas", "gear"]} />
            </div>
          </div>

          <div className="grid gap-5">
            {SETTINGS_GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-[10px] border border-(--terciary-grey) p-4"
              >
                <div className="mb-3">
                  <div className="text-style__big-text text-(--primary-blue)">
                    {group.title}
                  </div>
                  <div className="text-style__body text-(--primary-grey)">
                    {group.description}
                  </div>
                </div>

                <div className="grid gap-2.5 md:grid-cols-2">
                  {group.options.map((option) => (
                    <SettingToggle key={option} label={option} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Account Boundaries
            </div>
            <div className="text-style__body text-(--primary-grey)">
              A quick map of what belongs here versus profile, security, and
              admin-level user management.
            </div>
          </div>

          <div className="grid gap-2.5">
            <div className="rounded-[10px] border border-(--terciary-grey) bg-(--background) p-3">
              <div className="text-style__small-text text-(--primary-grey)">
                Dashboard density
              </div>
              <div className="text-style__body--bold text-(--primary-blue)">
                {user?.preferences?.dashboardDensity || "compact"}
              </div>
            </div>

            {SETTINGS_SHORTCUTS.map((shortcut) => (
              <div
                key={shortcut.label}
                className="rounded-[10px] border border-(--terciary-grey) bg-(--background) p-3"
              >
                <div className="mb-1 flex items-start justify-between gap-3">
                  <div className="text-style__big-text text-(--primary-blue)">
                    {shortcut.label}
                  </div>
                  <span className="rounded-border border-(--secondary-blue)/30 bg-(--secondary-blue)/10 text-(--secondary-blue) text-style__small-text">
                    {shortcut.status}
                  </span>
                </div>
                <div className="text-style__body text-(--primary-grey)">
                  {shortcut.value}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[10px] border border-(--primary-yellow)/60 bg-(--primary-yellow)/15 p-3">
            <div className="mb-1 text-style__big-text text-(--primary-blue)">
              Role changes stay protected
            </div>
            <p className="text-style__body text-(--primary-grey)">
              Promotions, demotions, and permission grants should be handled in
              Settings & Users by senior departments.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function SettingToggle({ label }: { label: string }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-[10px] border border-(--terciary-grey) bg-white p-3">
      <span className="text-style__body">{label}</span>
      <span className="grid h-6 w-11 place-items-center rounded-full bg-(--primary-blue) p-1">
        <span className="ml-auto h-4 w-4 rounded-full bg-(--primary-yellow)"></span>
      </span>
    </label>
  );
}
