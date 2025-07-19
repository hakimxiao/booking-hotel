"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { contactSchema, ReserveSchema, RoomSchema } from "@/lib/zod";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";

export const saveRoom = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is required" };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedField = RoomSchema.safeParse(rawData);
  if (!validatedField.success) {
    return { error: validatedField.error.flatten().fieldErrors };
  }

  const { name, description, price, capacity, amenities } = validatedField.data;

  try {
    await prisma.room.create({
      data: {
        name,
        description,
        image,
        price,
        capacity,
        RoomAmenities: {
          createMany: {
            data: amenities.map((item) => ({
              amenitiesId: item,
            })),
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  redirect("/admin/room");
};

export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedField = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedField.success) {
    return { error: validatedField.error.flatten().fieldErrors };
  }

  const { name, email, subject, message } = validatedField.data;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return { message: "Terimkasih telah menghubungi Mimo." };
  } catch (error) {
    console.log(error);
  }
};

// Delete Room
export const deleteRoom = async (id: string, image: string) => {
  try {
    await del(image);
    await prisma.room.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/admin/room");
};

// update room
export const updateRoom = async (
  image: string,
  roomId: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { message: "Image is required" };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    amenities: formData.getAll("amenities"),
  };

  const validatedField = RoomSchema.safeParse(rawData);
  if (!validatedField.success) {
    return { error: validatedField.error.flatten().fieldErrors };
  }

  const { name, description, price, capacity, amenities } = validatedField.data;

  try {
    await prisma.$transaction([
      prisma.room.update({
        where: { id: roomId },
        data: {
          name,
          description,
          image,
          price,
          capacity,
          RoomAmenities: {
            deleteMany: {},
          },
        },
      }),
      prisma.roomAmenities.createMany({
        data: amenities.map((item) => ({
          roomId,
          amenitiesId: item,
        })),
      }),
    ]);
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/admin/room");
  redirect("/admin/room");
};

export const createReserve = async (
  roomId: string,
  price: number,
  starDate: Date,
  endDate: Date,
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if(!session || !session.user || !session.user.id) redirect(`/signin?redirect_url=room/${roomId}`);

  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone')
  }

  const validatedField = ReserveSchema.safeParse(rawData);
  if(!validatedField.success) {
    return {
      error: validatedField.error.flatten().fieldErrors
    }
  }

  const {name, phone} = validatedField.data;
  const night = differenceInCalendarDays(endDate, starDate);
  if(night <= 0) return {messageDate: "Date Must Be At Least 1 night"}
  const total = night * price;

  let reservationId;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        data: {
          name,
          phone
        },
        where: {id: session.user.id} 
      });
      const reservation = await tx.reservation.create({
        data: {
          starDate: starDate,
          endDate: endDate,
          price: price,
          roomId: roomId,
          userId: session.user.id as string,
          Payment: {
            create: {
              amount: total,
            }
          }
        }
      })
      reservationId = reservation.id
    })
  } catch (error) {
    console.log(error);
  }
  redirect(`/checkout/${reservationId}`);
};