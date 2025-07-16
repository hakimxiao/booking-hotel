import EditForm from "@/components/admin/room/EditForm";
import { getAmenities, getRoomByID } from "@/lib/data";
import { notFound } from "next/navigation";

const EditRoom = async ({ roomId }: { roomId: string }) => {
  // Paralell Data Fetching   : Handle untuk jika ada data fetch yang lebih dari 1.
  const [amenities, room] = await Promise.all([
    getAmenities(),
    getRoomByID(roomId),
  ]);

  if (!amenities || !room) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit a Room</h1>
      <EditForm amenities={amenities} room={room} />
    </div>
  );
};

export default EditRoom;
