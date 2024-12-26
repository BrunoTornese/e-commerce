"use client";

import { paypalCheckPayment, setTransactionId } from "@/app/actions";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="space-y-2">
        <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="h-8 w-2/3 bg-gray-300 rounded-lg animate-pulse mx-auto"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded-lg animate-pulse mx-auto"></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: `${roundedAmount}`,
          },
        },
      ],
      intent: "CAPTURE",
    });

    const { ok } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error("Error creating order");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) {
      return;
    }

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
