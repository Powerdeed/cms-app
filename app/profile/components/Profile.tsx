"use client";

import { useMemo, useState } from "react";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGlobals } from "@globals";
import { SectionTitle } from "@global components/ui/Title";

import {
  PAGE_DATA,
  PROFILE_SECTIONS,
  PROFILE_STATS,
} from "../constants/PAGE_DATA";
import ProfileAvatar from "./ProfileAvatar";
import ProfileCheck from "./ProfileCheck";
import ProfileEditor from "./ProfileEditor";
import SignalCard from "./SignalCard";

export default function Profile() {
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const {
    globalStates: { user },
  } = useGlobals();

  const initials = useMemo(() => {
    const fallbackName = "Command Operator";
    const name = user?.name || fallbackName;

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [user?.name]);

  const activeSince = user?.createdAt
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(user.createdAt))
    : "Not recorded";
  const displayName = user?.profile?.preferredName || user?.name;
  const avatarImage = profileImage || user?.profile?.avatarUrl || "";

  return (
    <div className="uniform-page-display">
      <SectionTitle title={PAGE_DATA.heading} subtitle={PAGE_DATA.subheading} />

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="feature-container-vertical overflow-hidden">
          <div className="relative grid gap-5 md:grid-cols-[auto_1fr]">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border border-(--secondary-blue)/20"></div>
            <div className="absolute -right-8 top-8 h-24 w-24 rounded-full border border-(--primary-yellow)/50"></div>

            <ProfileAvatar
              initials={initials}
              image={avatarImage}
              size="large"
            />

            <div className="relative flex flex-col justify-between gap-5">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2.5">
                  <span className="rounded-border border-(--primary-green)/40 bg-(--primary-green)/10 text-(--primary-green) text-style__small-text">
                    Online
                  </span>
                  <span className="rounded-border border-(--secondary-blue)/30 bg-(--secondary-blue)/10 text-(--secondary-blue) text-style__small-text">
                    Command Center
                  </span>
                </div>
                <h1 className="text-style__heading text-(--primary-blue)">
                  {displayName || "Command Operator"}
                </h1>
                <p className="text-style__body text-(--primary-grey)">
                  {user?.email || "operator@powerdeed.co.ke"}
                </p>
                {(user?.profile?.jobTitle || user?.profile?.department) && (
                  <p className="text-style__small-text text-(--primary-grey)">
                    {[user.profile.jobTitle, user.profile.department]
                      .filter(Boolean)
                      .join(" - ")}
                  </p>
                )}
              </div>

              <button
                type="button"
                className="flex w-fit items-center gap-2 rounded-[10px] bg-(--primary-blue) px-4 py-2.5 text-style__small-text text-white duration-200 hover:bg-(--secondary-blue)"
                onClick={() => setEditingProfile(true)}
              >
                <FontAwesomeIcon icon={["far", "pen-to-square"]} />
                Edit profile
              </button>

              <div className="grid gap-2.5 sm:grid-cols-3">
                {PROFILE_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[10px] border border-(--terciary-grey) bg-background p-3"
                  >
                    <div
                      className={`mb-2 grid h-8 w-8 place-items-center rounded-[10px] ${stat.tone}`}
                    >
                      <FontAwesomeIcon
                        icon={stat.icon as [IconPrefix, IconName]}
                      />
                    </div>
                    <div className="text-style__heading">{stat.value}</div>
                    <div className="text-style__small-text text-(--primary-grey)">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="feature-container-vertical">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-style__subheading text-(--primary-blue)">
                Operator Signal
              </div>
              <div className="text-style__body text-(--primary-grey)">
                Current command posture and active workspace details
              </div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-(--primary-yellow)/40 text-(--primary-blue)">
              <FontAwesomeIcon icon={["fas", "gear"]} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <SignalCard label="Role" value={user?.role || "Admin"} />
            <SignalCard label="Active since" value={activeSince} />
            <SignalCard label="Session" value="Protected" />
            <SignalCard label="Mode" value="Editorial ops" />
          </div>

          <div className="rounded-[10px] border border-(--terciary-grey) p-3">
            <div className="mb-2 flex items-center justify-between text-style__small-text">
              <span className="text-(--primary-blue)">Profile completion</span>
              <span className="font-semibold">86%</span>
            </div>
            <div className="h-2 rounded-full bg-(--terciary-grey)/50">
              <div className="h-full w-[86%] rounded-full bg-(--primary-green)"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Access Map
            </div>
            <div className="text-style__body text-(--primary-grey)">
              Areas this profile can operate inside the command center
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-2">
            {PROFILE_SECTIONS.map((section) => (
              <div
                key={section.label}
                className="rounded-[10px] border border-(--terciary-grey) p-3 duration-200 hover:border-(--secondary-blue)/40 hover:bg-background"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="text-style__big-text text-(--primary-blue)">
                    {section.label}
                  </div>
                  <span
                    className={`rounded-border text-style__small-text ${
                      section.status === "Active"
                        ? "border-(--primary-green)/40 bg-(--primary-green)/10 text-(--primary-green)"
                        : section.status === "Review"
                          ? "border-(--primary-yellow)/60 bg-(--primary-yellow)/20 text-(--primary-blue)"
                          : "border-(--secondary-grey) bg-(--terciary-grey)/30 text-(--primary-grey)"
                    }`}
                  >
                    {section.status}
                  </span>
                </div>
                <p className="text-style__body text-(--primary-grey)">
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Role Governance
            </div>
            <div className="text-style__body text-(--primary-grey)">
              Role changes should be handled by senior departments during
              promotions, demotions, or access reviews.
            </div>
          </div>

          <div className="rounded-[10px] border border-(--primary-yellow)/60 bg-(--primary-yellow)/15 p-3">
            <div className="mb-1 flex items-center gap-2 text-style__big-text text-(--primary-blue)">
              <FontAwesomeIcon icon={["fas", "shield-halved"]} />
              {user?.role || "Admin"}
            </div>
            <p className="text-style__body text-(--primary-grey)">
              This profile can display the current role, but cannot grant or
              remove access.
            </p>
          </div>

          <div className="grid gap-2.5">
            <ProfileCheck label="Role is not editable by the profile owner" />
            <ProfileCheck label="Access map mirrors granted permissions" />
            <ProfileCheck label="Future role changes belong in Settings & Users" />
          </div>
        </div>
      </section>

      {editingProfile && (
        <ProfileEditor
          name={user?.name || "Command Operator"}
          email={user?.email || "operator@powerdeed.co.ke"}
          role={user?.role || "Admin"}
          initials={initials}
          profileImage={avatarImage}
          phone={user?.profile?.phone || ""}
          department={user?.profile?.department || ""}
          jobTitle={user?.profile?.jobTitle || ""}
          bio={user?.profile?.bio || ""}
          setProfileImage={setProfileImage}
          closeEditor={() => setEditingProfile(false)}
        />
      )}
    </div>
  );
}
