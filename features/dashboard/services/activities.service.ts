import { Activities } from "../types/activities.types";
import { apiRequest } from "@lib";

export const getAuditLogs = async (): Promise<Activities[]> =>
  await apiRequest<Activities[]>({
    method: "GET",
    url: "/audit-logs",
  });

export const deleteAuditLog = async (auditLogId: string): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/audit-logs/${auditLogId}`,
  });

export const deleteAuditLogs = async (auditLogIds: string): Promise<void> =>
  await apiRequest({
    method: "DELETE",
    url: `/audit-logs/${auditLogIds}`,
  });
