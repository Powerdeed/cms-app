import {
  Inquiry,
  InquiryDateInput,
  InquiryTrendRange,
  InquiryTrends,
  Month,
} from "../types/inquiries.types";

export const MONTHS: Month[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getInquiryTrendsFromInquiries = (
  inquiries: Inquiry[],
): InquiryTrends => {
  return inquiries.reduce<InquiryTrends>((trends, inquiry) => {
    const date = getInquiryDate(inquiry.createdAt);

    if (!date) return trends;

    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];

    trends[year] = trends[year] ?? getEmptyMonthCounts();
    trends[year][month] += 1;

    return trends;
  }, {});
};

export function getInquiryTrendSeries(
  trends: InquiryTrends | null,
  selectedRange: InquiryTrendRange,
  now = new Date(),
) {
  if (!trends) return { labels: [], data: [] };

  if (selectedRange === "last-month") {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return getSeriesForDates(trends, [lastMonth], true);
  }

  if (selectedRange === "last-6-months") {
    const dates = Array.from({ length: 6 }, (_, index) => {
      const monthsBack = 5 - index;
      return new Date(now.getFullYear(), now.getMonth() - monthsBack, 1);
    });

    return getSeriesForDates(trends, dates, true);
  }

  const year =
    selectedRange === "current-year"
      ? now.getFullYear()
      : Number(selectedRange);
  const endMonthIndex =
    selectedRange === "current-year" ? now.getMonth() : MONTHS.length - 1;
  const labels = MONTHS.slice(0, endMonthIndex + 1);

  return {
    labels,
    data: labels.map((month) => trends[year]?.[month] ?? 0),
  };
}

export function getAvailableInquiryTrendYears(
  trends: InquiryTrends | null,
  startYear = 2013,
  now = new Date(),
) {
  const currentYear = now.getFullYear();
  const yearsFromData = Object.keys(trends ?? {})
    .map(Number)
    .filter((year) => !Number.isNaN(year) && year < currentYear);
  const start = Math.min(startYear, ...yearsFromData, currentYear);

  return Array.from(
    { length: Math.max(currentYear - start, 0) },
    (_, index) => start + index,
  );
}

function getSeriesForDates(
  trends: InquiryTrends,
  dates: Date[],
  includeYear: boolean,
) {
  return {
    labels: dates.map((date) => getMonthLabel(date, includeYear)),
    data: dates.map((date) => {
      const year = date.getFullYear();
      const month = MONTHS[date.getMonth()];

      return trends[year]?.[month] ?? 0;
    }),
  };
}

function getMonthLabel(date: Date, includeYear: boolean) {
  const month = MONTHS[date.getMonth()];

  return includeYear ? `${month} ${date.getFullYear()}` : month;
}

function getEmptyMonthCounts() {
  return MONTHS.reduce(
    (acc, month) => {
      acc[month] = 0;
      return acc;
    },
    {} as Record<Month, number>,
  );
}

function getInquiryDate(dateInput: InquiryDateInput) {
  const rawDate =
    typeof dateInput === "object" && dateInput !== null && "$date" in dateInput
      ? dateInput.$date
      : dateInput;
  const date = new Date(rawDate);

  return Number.isNaN(date.getTime()) ? null : date;
}
