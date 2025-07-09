import {object, string} from 'zod';

export const contactSchema = object({
    name: 
        string()
        .min(6, "Nama at least 6 characters"),
    email: 
        string()
        .min(6, "Email at least 6 characters")
        .email("Invalid email format"),
    subject: 
        string()
        .min(6, "Email at least 6 characters"),
    message: 
        string()
        .min(5, "Message at least 5 characters")
        .max(200, "Message must be less than 200 characters")
})