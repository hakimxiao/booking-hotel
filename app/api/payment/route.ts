import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { ReservationProps } from "@/types/reservation";

const snap = new Midtrans.Snap({
    isProduction: false, // karena kita masih sanbox maka buat ke false
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
})

export const POST = async(request: Request) => {
    const reservation: ReservationProps = await request.json();

    const parameter = {
        transaction_details: {
            order_id: reservation.id,
            gross_amount: reservation.Payment?.amount || 0,
        }, 
        credit_card: {  
            secure: true
        },
        customer_details: {
            first_name: reservation.user.name,
            email: reservation.user.email
        }
    }

    const token = await snap.createTransactionToken(parameter);
    return NextResponse.json(token);
}