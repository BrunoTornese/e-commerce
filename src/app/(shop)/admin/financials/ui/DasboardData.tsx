import { getOrders, getTotalSales, getTotalExpenses } from "@/app/actions";

export async function getDashboardData() {
  try {
    const [ordersTotal, totalSales, totalExpenses] = await Promise.all([
      getOrders(),
      getTotalSales(),
      getTotalExpenses(),
    ]);

    return {
      ordersTotal,
      totalSales,
      totalExpenses,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}
