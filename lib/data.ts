import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getAmenities = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized Access");
  }

  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = async () => {
  try {
    const result = await prisma.room.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomByID = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: { RoomAmenities: { select: { amenitiesId: true } } },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getRoomDetailById = async (roomId: string) => {
  try {
    const result = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        RoomAmenities: {
          include: {
            Amenities: { select: { name: true } },
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservationById = async (id: string) => {
  try {
    const result = await prisma.reservation.findUnique({
      where: { id },
      include: {
        room: {
          select: {name: true, image: true, price: true}
        },
       user: {
        select: {name: true, email: true, phone: true}
       },
       Payment: true
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDisabledRoomById = async (roomId: string) => {
  try {
    const result = await prisma.reservation.findMany({
      select: {
        starDate: true,
        endDate: true,
      },
      where: {
        roomId: roomId,
        Payment: {status: {not: "failure"}}
      }
    })
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getReservatioByUserId = async() => {
  const session = await auth();
  if(!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized Access");
  }

  try {
    const result = await prisma.reservation.findMany({
      where: {userId: session.user.id},
      include: {
        room: {
          select: {name: true, image: true, price: true}
        },
        user: {
          select: {name: true, email: true, phone: true}
        },
        Payment: true
      },
      orderBy: {createdAt: "desc"}
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const getRevenueAndReserve = async () => {
  try {
    // aggregate berfungsi untuk melakukkan operasi aritmatika, seperti count(total) sum dll reservation
    const result = await prisma.reservation.aggregate({
      _count: true,
      _sum: {
        price: true
      },
      where: {
        Payment: {status: {not: "failure"}}
      }
    });
    return {
      revenue: result._sum.price || 0,
      reserve: result._count,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getTotalCustomer = async () => {
  try {
    const result = await prisma.reservation.findMany({
      // distinc digunakan untuk menghitung hal unik, seperti sekarang yaitu user id
      distinct: ["userId"],
      where: {
        Payment: {status: {not: "failure"}}
      },
      select: {
        userId: true
      }
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
