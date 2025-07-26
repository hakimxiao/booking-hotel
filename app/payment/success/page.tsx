import { type Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiCheckCircle } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "Payment Success",
};

const PaymentSuccess = async ({
  searchParams,
}: {
  searchParams: Promise<{ transaction_status: string }>;
}) => {
  const paymentStatus = (await searchParams).transaction_status;
  if (paymentStatus == "pending") redirect("/payment/pending");
  if (paymentStatus == "failure") redirect("/payment/failure");

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <div className="p-6 md:mx-auto">
        <HiCheckCircle className="text-green-600 w-20 h-20 mx-auto my-6" />
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment Done !
        </h3>
        <p className="text-gray-600 my-2">
          Thank you for completing youre secure online payment
        </p>
        <p>Have a greet day 😊</p>
        <div className="py-10 text-center">
          <Link
            href="/myreservation"
            className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
          >
            GO TO MYRESERVATION
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
