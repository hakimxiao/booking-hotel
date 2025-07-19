import {object, string, coerce, array} from 'zod';


export const RoomSchema = object({
    name: string().min(1),
    description: string().min(50),
    capacity: coerce.number().gt(0),        // coerce : U/ string ke number || gt : greater than
    price: coerce.number().gt(0),
    amenities: array(string()).nonempty()   // terdapat array yang didalamnya string
})

export const ReserveSchema = object({
    name: string().min(1),
    phone: string().min(10),
})

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