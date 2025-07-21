import CheckoutDetail from "@/components/CheckoutDetail";
import React from "react";

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationId = (await params).id;

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <h1>Checkout Page</h1>
      <CheckoutDetail reservationId={reservationId} />
    </div>
  );
};

export default CheckoutPage;
