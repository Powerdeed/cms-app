import { Inquiry, LeadSourceData } from "../types/inquiries.types";

const UNKNOWN_SOURCE = "Unknown";

export function getLeadSourcesFromInquiries(
  inquiries: Inquiry[],
): LeadSourceData {
  const sourceCounts = inquiries.reduce<Record<string, number>>(
    (counts, inquiry) => {
      const source = normalizeSource(inquiry.hearAboutUs || inquiry.source);

      counts[source] = (counts[source] ?? 0) + 1;

      return counts;
    },
    {},
  );

  const entries = Object.entries(sourceCounts).sort(([, a], [, b]) => b - a);

  return {
    labels: entries.map(([source]) => source),
    values: entries.map(([, count]) => count),
  };
}

function normalizeSource(source?: string) {
  const normalizedSource = source?.trim();

  if (!normalizedSource) return UNKNOWN_SOURCE;

  return normalizedSource
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
