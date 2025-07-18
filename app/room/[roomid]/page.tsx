import { Metadata } from "next";
import RoomDetail from "@/components/RoomDetail";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room Detail",
};

const RoomDetailPage = async ({
  params,
}: {
  params: Promise<{ roomid: string }>;
}) => {
  const roomId = (await params).roomid;

  return (
    <div className="mt-16">
      <Suspense fallback={<p>Loading ...</p>}>
        <RoomDetail roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default RoomDetailPage;
