import { notFound } from "next/navigation";
import EditRoom from "@/components/admin/room/Edit-Room";
import { Suspense } from "react";

const UpdateRoomPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const roomId = (await params).id;
  if (!roomId) return notFound();

  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <Suspense fallback={<p>Loading Card ...</p>}>
        <EditRoom roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default UpdateRoomPage;
