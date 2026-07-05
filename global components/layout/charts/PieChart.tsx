import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipItem,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { type PieProps } from "./context/ChartContext";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart({ labels, pieData }: PieProps) {
  const hasData = pieData?.some((value) => value > 0);

  if (!hasData) {
    return (
      <div className="grid h-full place-items-center text-style__small-text text-(--primary-grey)">
        No inquiry source data yet
      </div>
    );
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: pieData,
        backgroundColor: [
          "rgba(54, 162, 235)",
          "rgba(10, 255, 179)",
          "rgba(255, 206, 86)",
          "rgba(128, 0, 128)",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    layout: {
      padding: 60,
    },
    responsive: true,
    rotation: 90,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
    },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        clip: false, // CRITICAL: Tells Chart.js not to cut off text at the edge
        clamp: true, // Forces labels to stay within the canvas boundary
        anchor: "end",
        align: "end",
        offset: 5,
        formatter: (value, context) => {
          // 1. Get the label name from the main labels array
          const label = context.chart.data.labels?.[context.dataIndex];

          // 2. Calculate percentage
          const dataset = context.dataset.data as number[];
          const total = dataset.reduce((acc, val) => acc + val, 0);
          if (total === 0) return `${label}\n0%`;

          const percentage = ((value / total) * 100).toFixed(1) + "%";

          return `${label}\n${percentage}`;
        },
        color: (context) => {
          const backgroundColor = context.dataset.backgroundColor as string[];
          return backgroundColor[context.dataIndex] || "#000";
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            const label = context.label || "";
            const value = context.raw ?? 0;
            return `${label}: ${value} inquiries`;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}
