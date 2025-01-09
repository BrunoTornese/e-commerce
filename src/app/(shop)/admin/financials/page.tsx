"use client";

import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaWallet,
  FaChartLine,
} from "react-icons/fa";

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 bg-gray-50">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of your ecommerce performance</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center">
          <FaMoneyBillWave className="text-green-500 text-4xl mr-4" />
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Total Sales</h2>
            <p className="text-2xl font-bold text-gray-800">$10,000</p>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center">
          <FaShoppingCart className="text-blue-500 text-4xl mr-4" />
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-800">120</p>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center">
          <FaWallet className="text-red-500 text-4xl mr-4" />
          <div>
            <h2 className="text-gray-600 text-sm font-medium">
              Total Expenses
            </h2>
            <p className="text-2xl font-bold text-gray-800">$1,250</p>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg flex items-center">
          <FaChartLine className="text-purple-500 text-4xl mr-4" />
          <div>
            <h2 className="text-gray-600 text-sm font-medium">Net Profit</h2>
            <p className="text-2xl font-bold text-gray-800">$8,750</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-gray-600 text-lg font-medium">Sales Overview</h2>
          <div className="h-40 bg-gray-100 flex items-center justify-center rounded-lg mt-4">
            <p className="text-gray-500">[Chart Placeholder]</p>
          </div>
        </div>
      </section>
    </main>
  );
}
