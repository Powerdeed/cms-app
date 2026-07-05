"use client";

import { execute } from "@lib";
import { useContext, useEffect } from "react";
import { Activities } from "../types/activities.types";
import { getAuditLogs } from "../services/activities.service";
import { activitiesContext } from "../context/ActivitiesContext";
import { getDbCollectionsExcept } from "@lib/constants/DB_COLLECTIONS";

export default function useActivities() {
  const activitiesStates = useContext(activitiesContext);

  if (!activitiesStates)
    throw new Error("Activities Context must be within a Provider");

  const { setActivities, setFetchingActivities, setFetchingActivitiesError } =
    activitiesStates;

  useEffect(() => {
    const fetchAuditLogs = async () => {
      await execute(getAuditLogs, {
        setLoading: setFetchingActivities,
        setError: setFetchingActivitiesError,
        onSuccess: (auditLogs: Activities[]) => {
          if (auditLogs) {
            const activitiesFromLogs = auditLogs.filter((log) =>
              getDbCollectionsExcept(["users", "sessions", "otps"]).includes(
                log.collection.toLocaleLowerCase(),
              ),
            );

            setActivities(activitiesFromLogs);
          }
        },
      });
    };

    fetchAuditLogs();
  }, [setActivities, setFetchingActivities, setFetchingActivitiesError]);

  return {};
}
