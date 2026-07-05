"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  registerables,
  Filler,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { type LineProps } from "./context/ChartContext";

Chart.register(...registerables, Filler);

export default function LineGraph({
  labels,
  datasets,
  drawOnChartArea,
  scales,
}: LineProps) {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dataset = { ...datasets[0] };

  useEffect(() => {
    // Create an offscreen canvas to generate the gradient
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, -100, 0, 400);
    gradient.addColorStop(0, "rgba(0, 255, 179, 2)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    const chartDataSetter = () =>
      setChartData({
        labels: labels,
        datasets: [
          {
            label: dataset.label,
            data: dataset.data,
            fill: true,
            backgroundColor:
              dataset.backgroundColor === ""
                ? gradient
                : dataset.backgroundColor,
            borderColor: dataset.borderColor,
            tension: 0.4,
            pointRadius: 4,
            pointHitRadius: 10,
            pointStyle: "circle",
            pointBackgroundColor: "white",
            pointBorderWidth: 2,
          },
        ],
      });

    chartDataSetter();
  }, [
    dataset.backgroundColor,
    dataset.borderColor,
    dataset.data,
    dataset.label,
    labels,
  ]);

  const options: ChartOptions<"line"> = {
    interaction: {
      mode: "index",
      intersect: false,
      axis: "x",
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 1000,
      easing: "linear",
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        position: "average",
        yAlign: "top",
        intersect: false,
        enabled: true,
        titleColor: "#0ff",
        bodyColor: "#fff",
        padding: 10,
        borderColor: "#0ff",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.formattedValue;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        border: { dash: [5, 5] },
        grid: {
          drawTicks: true,
          drawOnChartArea: drawOnChartArea,
        },
      },
      y: {
        border: { dash: [5, 5] },
        min: scales?.y?.min,
        max: scales?.y?.max,
        grid: {
          drawTicks: true,
          drawOnChartArea: drawOnChartArea,
        },
        ticks: {
          ...(scales?.y?.ticks || {}),
          stepSize: Math.max(Math.ceil((scales?.y?.max ?? 5) / 4), 1),
          font: {
            size: isMobile ? 12 : 14,
          },
        },
      },
    },
  };

  return <>{chartData && <Line data={chartData} options={options} />}</>;
}
