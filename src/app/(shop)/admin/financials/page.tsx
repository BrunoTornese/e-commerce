import { getDashboardData } from "./ui/DasboardData";
import {
  FaBox,
  FaDollarSign,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

export default async function Dashboard() {
  let ordersTotal = 0,
    totalSales = 0,
    totalExpenses = 0;

  const session = await auth();

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  try {
    const data = await getDashboardData();
    ordersTotal = data.ordersTotal || 0;
    totalSales = data.totalSales || 0;
    totalExpenses = data.totalExpenses || 0;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }

  const netIncome = totalSales - totalExpenses;

  return (
    <main className="p-6 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Finances
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-blue-800">Orders</p>
            <p className="text-2xl text-blue-900 font-bold">{ordersTotal}</p>
          </div>
          <FaBox size={32} className="text-blue-500" />
        </div>

        <div className="bg-yellow-100 shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-yellow-800">Total Sales</p>
            <p className="text-2xl text-yellow-900 font-bold">{totalSales}</p>
          </div>
          <FaDollarSign size={32} className="text-yellow-500" />
        </div>

        <div className="bg-red-100 shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-red-800">Total Expenses</p>
            <p className="text-2xl text-red-900 font-bold">{totalExpenses}</p>
          </div>
          <FaMoneyBillWave size={32} className="text-red-500" />
        </div>

        <div className="bg-green-100 shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-green-800">Net Income</p>
            <p className="text-2xl text-green-900 font-bold">{netIncome}</p>
          </div>
          <FaChartLine size={32} className="text-green-500" />
        </div>
      </div>
    </main>
  );
}
