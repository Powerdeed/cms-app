"use client";

import { useContext, useEffect } from "react";
import {
  LineContext,
  PieContext,
} from "@global components/layout/charts/context/ChartContext";
import { inquiriesContext } from "../context/InquiriesContext";
import { getInquiryTrendSeries } from "../utils/getInquiryTrendsFromInquiries";
import { getLeadSourcesFromInquiries } from "../utils/getLeadSourcesFromInquiries";

export default function useGraphs() {
  const lContext = useContext(LineContext);
  const pieContext = useContext(PieContext);
  const inquiryStates = useContext(inquiriesContext);

  if (!lContext || !pieContext || !inquiryStates) {
    throw new Error("context must be used within a provider");
  }

  const { LineGraph, setLineProps } = lContext;
  const { PieDoughnut, setPieProps } = pieContext;
  const { inquiries, inquiryTrends, selectedInquiryTrendRange } = inquiryStates;

  useEffect(() => {
    const trendSeries = getInquiryTrendSeries(
      inquiryTrends,
      selectedInquiryTrendRange,
    );
    const maxTrendValue = Math.max(...trendSeries.data, 0);
    const yAxisMax = Math.max(Math.ceil(maxTrendValue * 1.2), 5);

    setLineProps({
      labels: trendSeries.labels,
      drawOnChartArea: true,
      datasets: [
        {
          label: "Inquiries",
          data: trendSeries.data,
          borderColor: "rgb(30,144,255)",
          backgroundColor: "transparent",
        },
      ],
      scales: {
        y: {
          min: 0,
          max: yAxisMax,
          ticks: {
            callback: (value: number | string) => String(value),
          },
        },
      },
    });
  }, [inquiryTrends, selectedInquiryTrendRange, setLineProps]);

  useEffect(() => {
    const leadSources = getLeadSourcesFromInquiries(inquiries);

    setPieProps({
      labels: leadSources.labels,
      pieData: leadSources.values,
    });
  }, [inquiries, setPieProps]);

  return { LineGraph, PieDoughnut };
}
