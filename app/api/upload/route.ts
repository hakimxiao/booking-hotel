import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const PUT = async(request: Request) => {
    const form = await request.formData();
    const file = form.get("file") as File;

    if(file.size === 0 || file.size === undefined) {
        return NextResponse.json({message: "File Is Required"}, {status: 400});
    }

    if(file.size > 400000) {
        return NextResponse.json({message: "File must be less than 4MB"}, {status: 400});
    }

    if(!file.type.startsWith("image/")) {
        return NextResponse.json({message: "File must be an image"}, {status: 400});
    }

    const blob = await put(file.name, file, {
        access: "public",
        multipart: true
    });

    return NextResponse.json(blob);
}