import { type Metadata } from "next";
import DashboarCard from "@/components/admin/DashboarCard";
import { Suspense } from "react";
import ReservationList from "@/components/admin/ReservationList";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <Suspense fallback={<p>Loading Card ...</p>}>
        <DashboarCard />
      </Suspense>
      <Suspense fallback={<p>Loading Reservations ...</p>}>
        <ReservationList />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
