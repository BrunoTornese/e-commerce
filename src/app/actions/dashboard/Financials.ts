import prisma from "@/lib/prisma";

export async function getOrders() {
  try {
    const ordersTotal = await prisma.order.count({
      where: {
        isPaid: true,
      },
    });
    return ordersTotal;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

export async function getTotalSales() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        isPaid: true,
      },
      include: {
        OrderItem: true,
      },
    });

    const totalSales = orders.reduce((acc, order) => {
      const orderTotal = order.OrderItem.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
      return acc + orderTotal;
    }, 0);

    return totalSales;
  } catch (error) {
    console.error("Error fetching total sales:", error);
    throw new Error("Failed to fetch total sales");
  }
}

export async function getTotalExpenses() {
  try {
    const expenses = await prisma.expense.findMany();
    const totalExpenses = expenses.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0);

    return totalExpenses;
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    throw new Error("Failed to fetch total expenses");
  }
}

export async function createExpense(
  name: string,
  amount: number,
  description?: string,
  date?: Date
) {
  try {
    const newExpense = await prisma.expense.create({
      data: {
        name,
        amount,
        description,
        date: date || new Date(),
      },
    });

    return { newExpense, ok: true };
  } catch (error) {
    console.error("Error creating expense:", error);
    throw new Error("Failed to create expense");
  }
}
