"use client";

import { useTransition } from "react";
import { ReservationProps } from "@/types/reservation";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

const PaymentButton = ({ reservation }: { reservation: ReservationProps }) => {
  const [isPending, startTransition] = useTransition();

  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const responseAPI = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
        });

        const { token } = await responseAPI.json();
        if (token) {
          window.snap.pay(token); // masalah karena belum sup ts: solusi dideclare di atas
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <button
      className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer"
      onClick={handlePayment}
    >
      Process Payment
    </button>
  );
};

export default PaymentButton;

// AKAN MEMBUAT FETCH DARI MIDTERM KE API YANG AKAN MERUBAH STATUS PEMBAYARAN SESUAI KONDISI
