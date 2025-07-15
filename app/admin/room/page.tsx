import Link from "next/link";
import RoomTable from "@/components/admin/room/Room-Table";
import { Suspense } from "react";

const RoomPage = () => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Room List</h1>
        <Link
          href="/admin/room/create"
          className="bg-orange-400 px-6 py-2.5 hover:bg-orange-500 text-white font-bold"
        >
          Create New
        </Link>
      </div>
      <Suspense fallback={<p>Loading Data...</p>}>
        <RoomTable />
      </Suspense>
    </div>
  );
};

export default RoomPage;
