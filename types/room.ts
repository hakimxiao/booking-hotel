import { Prisma } from "@prisma/client";


export type RoomProps = Prisma.RoomGetPayload<{
    // diambil dari data.ts
    include: {RoomAmenities: {select: {amenitiesId: true}}}
}>