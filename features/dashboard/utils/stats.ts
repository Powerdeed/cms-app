import { Activities } from "../types/activities.types";
import { Inquiry, InquiryDateInput } from "../types/inquiries.types";
import { Stats } from "../types/stats.types";

export function getDashboardStats(
  inquiries: Inquiry[],
  activities: Activities[],
  now = new Date(),
): Stats[] {
  const currentMonthInquiries = countInquiriesInMonth(inquiries, now);
  const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthInquiries = countInquiriesInMonth(
    inquiries,
    previousMonthDate,
  );
  const openLeads = inquiries.filter((inquiry) => inquiry.status === "new");
  const activeFollowUps = inquiries.filter(
    (inquiry) => inquiry.marketing?.status === "active",
  );
  const currentWeekActivities = countActivitiesInLastDays(activities, 7, now);
  const previousWeekActivities = countActivitiesInDateRange(
    activities,
    daysAgo(now, 14),
    daysAgo(now, 7),
  );

  return [
    {
      label: "New Inquiries",
      value: formatCount(currentMonthInquiries),
      change: getComparisonText(currentMonthInquiries, previousMonthInquiries),
      changeDirection: getComparisonDirection(
        currentMonthInquiries,
        previousMonthInquiries,
      ),
      icon: ["fas", "user-group"],
      iconColor: "text-(--secondary-blue)",
    },
    {
      label: "Open Leads",
      value: formatCount(openLeads.length),
      change: `${formatCount(activeFollowUps.length)} active follow-ups`,
      changeDirection: openLeads.length > 0 ? "up" : "neutral",
      icon: ["fas", "suitcase"],
      iconColor: "text-(--secondary-yellow)",
    },
    {
      label: "Active Follow-ups",
      value: formatCount(activeFollowUps.length),
      change: `${formatCount(getInactiveFollowUpCount(inquiries))} inactive sequences`,
      changeDirection: activeFollowUps.length > 0 ? "up" : "neutral",
      icon: ["fas", "chart-line"],
      iconColor: "text-(--secondary-green)",
    },
    {
      label: "Content Updates",
      value: formatCount(currentWeekActivities),
      change: getComparisonText(currentWeekActivities, previousWeekActivities),
      changeDirection: getComparisonDirection(
        currentWeekActivities,
        previousWeekActivities,
      ),
      icon: ["far", "pen-to-square"],
      iconColor: "text-(--secondary-red)",
    },
  ];
}

function countInquiriesInMonth(inquiries: Inquiry[], monthDate: Date) {
  return inquiries.filter((inquiry) => {
    const inquiryDate = getDate(inquiry.createdAt);

    return (
      inquiryDate?.getFullYear() === monthDate.getFullYear() &&
      inquiryDate.getMonth() === monthDate.getMonth()
    );
  }).length;
}

function countActivitiesInLastDays(
  activities: Activities[],
  days: number,
  now: Date,
) {
  return countActivitiesInDateRange(activities, daysAgo(now, days), now);
}

function countActivitiesInDateRange(
  activities: Activities[],
  startDate: Date,
  endDate: Date,
) {
  return activities.filter((activity) => {
    const activityDate = getDate(activity.createdAt);

    return (
      activityDate !== null &&
      activityDate >= startDate &&
      activityDate < endDate
    );
  }).length;
}

function getInactiveFollowUpCount(inquiries: Inquiry[]) {
  return inquiries.filter((inquiry) => inquiry.marketing?.status === "inactive")
    .length;
}

function getComparisonText(currentValue: number, previousValue: number) {
  if (previousValue === 0) {
    return currentValue === 0 ? "No change" : "New activity";
  }

  const percentageChange = Math.round(
    ((currentValue - previousValue) / previousValue) * 100,
  );
  const prefix = percentageChange > 0 ? "+" : "";

  return `${prefix}${percentageChange}% from previous period`;
}

function getComparisonDirection(currentValue: number, previousValue: number) {
  if (currentValue === previousValue) return "neutral";

  return currentValue > previousValue ? "up" : "down";
}

function getDate(dateInput: InquiryDateInput | Date) {
  const rawDate =
    typeof dateInput === "object" && dateInput !== null && "$date" in dateInput
      ? dateInput.$date
      : dateInput;
  const date = new Date(rawDate);

  return Number.isNaN(date.getTime()) ? null : date;
}

function daysAgo(date: Date, days: number) {
  const pastDate = new Date(date);
  pastDate.setDate(date.getDate() - days);

  return pastDate;
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-GB").format(value);
}
