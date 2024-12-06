"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="space-y-2">
        <div className="h-10 w-full bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="h-8 w-2/3 bg-gray-300 rounded-lg animate-pulse mx-auto"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded-lg animate-pulse mx-auto"></div>
      </div>
    );
  }

  return <PayPalButtons />;
};
