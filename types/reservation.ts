import { Prisma } from "@prisma/client";

export type ReservationProps = Prisma.ReservationGetPayload<{
    include: {
        room: {
            select: {
                name: true,
                image: true,
                price: true
            }
        },
        user: {
            select: {
                name: true,
                email: true,
                phone: true
            }
        }
        Payment: true
    }
}>