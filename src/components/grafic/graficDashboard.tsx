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
  labels: string[];
}

const FinancialChart = ({
  salesData,
  expensesData,
  netIncomeData,
  labels,
}: FinancialChartProps) => {
  const chartData = {
    labels: labels,
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
    ],
  };

  return (
    <div className="mt-6 max-w-full">
      <Line
        data={chartData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default FinancialChart;
