"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format, addMonths, startOfYear } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FinancialChartProps {
  salesData: number[];
  expensesData: number[];
  netIncomeData: number[];
  ordersData: number[];
}

const FinancialChart = ({
  salesData,
  expensesData,
  netIncomeData,
  ordersData,
}: FinancialChartProps) => {
  const generateMonthlyLabels = (): string[] => {
    const start = startOfYear(new Date());
    return Array.from({ length: 12 }, (_, i) =>
      format(addMonths(start, i), "MMMM")
    );
  };

  const chartData = {
    labels: generateMonthlyLabels(),
    datasets: [
      {
        label: "Total Sales",
        data: salesData,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Total Expenses",
        data: expensesData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Net Income",
        data: netIncomeData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Orders",
        data: ordersData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Financial Overview",
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-6 w-full h-[500px]">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default FinancialChart;
