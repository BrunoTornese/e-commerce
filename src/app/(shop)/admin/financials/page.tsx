import { getDashboardData } from "./ui/DasboardData";
import {
  FaBox,
  FaDollarSign,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { FinancialChart } from "@/components";

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

  // Usar directamente los valores obtenidos sin duplicar
  const salesData = [totalSales]; // Solo un dato para las ventas
  const expensesData = [totalExpenses]; // Solo un dato para los gastos
  const netIncomeData = [netIncome]; // Solo un dato para el ingreso neto
  const ordersData = [ordersTotal]; // Solo un dato para las órdenes

  return (
    <main className="p-6 min-h-screen bg-gradient-to-t from-white to-blue-100">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide uppercase">
          Financial Dashboard
        </h1>
        <p className="text-xl text-gray-600 mt-2">Overview of your finances</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 shadow-xl rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-blue-700">Orders</p>
              <p className="text-3xl font-bold text-blue-800">{ordersTotal}</p>
            </div>
            <FaBox size={40} className="text-blue-500" />
          </div>
        </div>

        <div className="bg-yellow-100 shadow-xl rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-yellow-700">
                Total Sales
              </p>
              <p className="text-3xl font-bold text-yellow-800">{totalSales}</p>
            </div>
            <FaDollarSign size={40} className="text-yellow-500" />
          </div>
        </div>

        <div className="bg-red-100 shadow-xl rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-red-700">
                Total Expenses
              </p>
              <p className="text-3xl font-bold text-red-800">{totalExpenses}</p>
            </div>
            <FaMoneyBillWave size={40} className="text-red-500" />
          </div>
        </div>

        <div className="bg-green-100 shadow-xl rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-green-700">Net Income</p>
              <p className="text-3xl font-bold text-green-800">{netIncome}</p>
            </div>
            <FaChartLine size={40} className="text-green-500" />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow-xl rounded-xl p-6">
        <FinancialChart
          salesData={salesData}
          expensesData={expensesData}
          netIncomeData={netIncomeData}
          ordersData={ordersData}
        />
      </div>
    </main>
  );
}
