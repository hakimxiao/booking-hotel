import { IoTrashOutline } from "react-icons/io5";
import { deleteRoom } from "@/lib/action";

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
  const DeleteRoomWidthId = deleteRoom.bind(null, id, image);

  return (
    <form action={DeleteRoomWidthId}>
      <button
        type="submit"
        className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer"
      >
        <IoTrashOutline className="size-5" />
      </button>
    </form>
  );
};
