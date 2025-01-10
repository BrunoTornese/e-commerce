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

export async function getTotalExpenses() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        isPaid: true,
      },
      include: {
        OrderItem: true,
      },
    });

    const totalExpenses = orders.reduce((acc, order) => {
      const orderTotal = order.OrderItem.reduce((sum, item) => {
        const productPrice = item.price;
        const quantity = item.quantity;

        const manufacturingCost = 0.2 * productPrice * quantity;
        const shippingCost = ((3 + 8) / 2) * quantity;
        const paymentGatewayFee = 0.02 * productPrice * quantity + 1 * quantity;
        const operationalCost = 0.03 * productPrice * quantity;

        const productTotalExpenses =
          manufacturingCost +
          shippingCost +
          paymentGatewayFee +
          operationalCost;
        return sum + productTotalExpenses;
      }, 0);

      return acc + orderTotal;
    }, 0);

    return totalExpenses;
  } catch (error) {
    console.error("Error fetching total expenses:", error);
    throw new Error("Failed to fetch total expenses");
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
