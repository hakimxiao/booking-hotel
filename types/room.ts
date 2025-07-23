import { Prisma } from "@prisma/client";

export type RoomProps = Prisma.RoomGetPayload<{
  // diambil dari data.ts
  include: { RoomAmenities: { select: { amenitiesId: true } } };
}>;

export type RoomDetailProps = Prisma.RoomGetPayload<{
  include: {
    RoomAmenities: {
      include: {
        Amenities: { select: { name: true } };
      };
    };
  };
}>;

export type DisabledDateProps = Prisma.ReservationGetPayload<{
  select: {
    starDate: true,
    endDate: true
  }
}>