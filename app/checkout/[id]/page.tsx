import CheckoutDetail from "@/components/CheckoutDetail";
import { Suspense } from "react";
import { type Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Reservation Sumary",
};

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationId = (await params).id;

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <h1 className="text-2xl font-semibold mb-8">Reservation Sumary</h1>
      <Suspense fallback={<p>Loading ...</p>}>
        <CheckoutDetail reservationId={reservationId} />
      </Suspense>
      {/* jika mode production jukup hilangkan sanbox */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
};

export default CheckoutPage;
