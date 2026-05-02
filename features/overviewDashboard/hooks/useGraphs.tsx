"use client";

import { useContext, useEffect } from "react";
import {
  LineContext,
  PieContext,
} from "@global components/layout/charts/context/ChartContext";
import {
  inquiryTrendsData,
  trafficSourceData,
} from "@features/overviewDashboard";

export default function useGraphs() {
  const lContext = useContext(LineContext);
  const pieContext = useContext(PieContext);

  if (!lContext || !pieContext) {
    throw new Error("context must be used within a provider");
  }

  const { LineGraph, setLineProps } = lContext;
  const { PieDoughnut, setPieProps } = pieContext;

  useEffect(() => {
    setLineProps({
      labels: Object.keys(inquiryTrendsData),
      drawOnChartArea: true,
      datasets: [
        {
          label: "Average Response Time (hours)",
          data: Object.values(inquiryTrendsData),
          borderColor: "rgb(30,144,255)",
          backgroundColor: "transparent",
        },
      ],
      scales: {
        y: {
          min: 0,
          max: 28,
          ticks: {
            callback: (value: number | string) => String(value),
          },
        },
      },
    });
  }, [setLineProps]);

  useEffect(() => {
    setPieProps({
      labels: trafficSourceData.channel,
      pieData: trafficSourceData.users,
    });
  }, [setPieProps]);

  return { LineGraph, PieDoughnut };
}
