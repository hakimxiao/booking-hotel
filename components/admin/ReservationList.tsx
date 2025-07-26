import { getReservations } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import clsx from "clsx";

const ReservationList = async () => {
  const reservations = await getReservations();

  if (!reservations?.length) return <p>No Reservations Found</p>;

  return (
    <div className="bg-white p-4 mt-5 shadow-sm">
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">
              Image
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Name
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Arrival
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Departure
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Room Name
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Price
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Created At
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase">
              Payment Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <tr className="hover:bg-gray-100" key={reservation.id}>
              <td className="px-6 py-4">
                <div className="h-20 w-32 relative">
                  <Image
                    src={reservation.room.image}
                    fill
                    sizes="20vw"
                    alt="room image"
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4">{reservation.user.name}</td>
              <td className="px-6 py-4">
                {formatDate(reservation.starDate.toISOString())}
              </td>
              <td className="px-6 py-4">
                {formatDate(reservation.endDate.toISOString())}
              </td>
              <td className="px-6 py-4">{reservation.room.name}</td>
              <td className="px-6 py-4">{formatCurrency(reservation.price)}</td>
              <td className="px-6 py-4">
                {formatDate(reservation.createdAt.toString())}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-center gap-1">
                  <span
                    className={clsx("capitalize", {
                      "text-green-500": reservation.Payment?.status === "paid",
                      "text-red-500": reservation.Payment?.status === "failure",
                      "text-blue-500":
                        reservation.Payment?.status === "pending",
                      "text-gray-600": reservation.Payment?.status === "unpaid",
                    })}
                  >
                    {reservation.Payment?.status}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
