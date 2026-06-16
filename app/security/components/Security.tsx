"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGlobals } from "@globals";
import { SectionTitle } from "@global components/ui/Title";
import { getSessions } from "@app/login/services/authUser";
import { UserSession } from "@app/profile";

import {
  SECURITY_CHECKS,
  SECURITY_PAGE_DATA,
  SECURITY_STATS,
  SESSION_ROWS,
} from "../constants/PAGE_DATA";

export default function Security() {
  const [sessions, setSessions] = useState<UserSession[]>([]);
  const {
    globalStates: { user },
  } = useGlobals();

  useEffect(() => {
    getSessions()
      .then(setSessions)
      .catch(() => setSessions([]));
  }, []);

  return (
    <main className="uniform-page-display">
      <SectionTitle
        title={SECURITY_PAGE_DATA.heading}
        subtitle={SECURITY_PAGE_DATA.subheading}
      />

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="feature-container-vertical">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-style__subheading text-(--primary-blue)">
                Protection Summary
              </div>
              <div className="text-style__body text-(--primary-grey)">
                Current safety posture for this signed-in operator.
              </div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-(--primary-blue) text-white">
              <FontAwesomeIcon icon={["fas", "shield-halved"]} />
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3 xl:grid-cols-1">
            {SECURITY_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[10px] border border-(--terciary-grey) bg-background p-3"
              >
                <div
                  className={`mb-2 w-fit rounded-[10px] px-2 py-1 ${stat.tone}`}
                >
                  <span className="text-style__small-text">{stat.label}</span>
                </div>
                <div className="text-style__heading text-(--primary-blue)">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/forgot-password"
            className="flex items-center justify-between rounded-[10px] bg-(--primary-blue) px-4 py-3 text-style__small-text text-white duration-200 hover:bg-(--secondary-blue)"
          >
            Reset password
            <FontAwesomeIcon icon={["fas", "angle-right"]} />
          </Link>
        </div>

        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Session Control
            </div>
            <div className="text-style__body text-(--primary-grey)">
              Session visibility based on the auth flow currently available in
              the command center.
            </div>
          </div>

          <div className="grid gap-2.5">
            {SESSION_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-start justify-between gap-4 rounded-[10px] border border-(--terciary-grey) p-3"
              >
                <div>
                  <div className="text-style__big-text text-(--primary-blue)">
                    {row.label}
                  </div>
                  <div className="text-style__body text-(--primary-grey)">
                    {row.detail}
                  </div>
                </div>
                <span
                  className={`rounded-border text-style__small-text ${
                    row.status === "Active"
                      ? "border-(--primary-green)/40 bg-(--primary-green)/10 text-(--primary-green)"
                      : row.status === "Pending API"
                        ? "border-(--primary-yellow)/60 bg-(--primary-yellow)/20 text-(--primary-blue)"
                        : "border-(--secondary-blue)/30 bg-(--secondary-blue)/10 text-(--secondary-blue)"
                  }`}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-[10px] border border-(--secondary-blue)/30 bg-(--secondary-blue)/10 p-3">
            <div className="text-style__small-text text-(--primary-grey)">
              Active session count
            </div>
            <div className="text-style__heading text-(--primary-blue)">
              {sessions.length || "Unknown"}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Security Checklist
            </div>
            <div className="text-style__body text-(--primary-grey)">
              The concrete protections already represented in the app.
            </div>
          </div>

          <div className="grid gap-2.5 md:grid-cols-2">
            {SECURITY_CHECKS.map((check) => (
              <div
                key={check}
                className="flex items-center gap-2.5 rounded-[10px] border border-(--terciary-grey) p-3"
              >
                <div className="grid h-7 w-7 place-items-center rounded-full bg-(--primary-green)/10 text-(--primary-green)">
                  <FontAwesomeIcon icon={["fas", "check"]} />
                </div>
                <div className="text-style__body">{check}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="feature-container-vertical">
          <div>
            <div className="text-style__subheading text-(--primary-blue)">
              Access Governance
            </div>
            <div className="text-style__body text-(--primary-grey)">
              Role assignment is visible for clarity, but cannot be edited from
              this profile-owned security page.
            </div>
          </div>

          <div className="rounded-[10px] border border-(--primary-yellow)/60 bg-(--primary-yellow)/15 p-3">
            <div className="text-style__small-text text-(--primary-grey)">
              Current role
            </div>
            <div className="text-style__heading text-(--primary-blue)">
              {user?.role || "Admin"}
            </div>
            <p className="mt-2 text-style__body text-(--primary-grey)">
              Senior departments should process promotions, demotions, and
              permission changes through Settings & Users.
            </p>
          </div>

          <div className="grid gap-2.5">
            <SecurityMeta
              label="Recovery email"
              value={user?.security?.recoveryEmail || "Not configured"}
            />
            <SecurityMeta
              label="Last sign in"
              value={
                user?.security?.lastLoginAt
                  ? new Date(user.security.lastLoginAt).toLocaleString()
                  : "Not recorded"
              }
            />
            <SecurityMeta
              label="Session timeout"
              value={`${user?.security?.sessionTimeoutMinutes || 480} minutes`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function SecurityMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-(--terciary-grey) bg-(--background) p-3">
      <div className="text-style__small-text text-(--primary-grey)">
        {label}
      </div>
      <div className="text-style__body--bold text-(--primary-blue)">
        {value}
      </div>
    </div>
  );
}
