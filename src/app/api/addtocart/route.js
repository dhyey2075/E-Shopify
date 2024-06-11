import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Cart from "@/app/models/cart.js";

export async function POST(reqq, res){
    await connectToMongoDB();
    const req = await reqq.json();
    const { name, email, productID } = req;
    const cart = await new Cart({ name, email, productID});
    await cart.save();
    return NextResponse.json({ status: 200, cart });
}