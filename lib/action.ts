"use server";

import {prisma} from '@/lib/prisma';
import { contactSchema } from "@/lib/zod";

export const ContactMessage = async (formData: FormData) => {
    const validatedField = contactSchema.safeParse(Object.fromEntries(formData.entries()));

    if(!validatedField.success) {
        return {error: validatedField.error.flatten().fieldErrors};
    }

    const {name, email, subject, message} = validatedField.data;


    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message
            }
        });
        return {message: "Terimkasih telah menghubungi Mimo."}
    } catch (error) {
        console.log(error);
    }
}