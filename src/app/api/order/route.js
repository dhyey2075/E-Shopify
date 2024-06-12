import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Order from "@/app/models/order";

export async function POST(reqq, res){
    await connectToMongoDB();
    const req = await reqq.json();
    const { email, products, totalAmount, status, shippingAddress, paymentMethod } = req;
    const order = new Order({ email, products, totalAmount, status, shippingAddress, paymentMethod });
    await order.save();
    return NextResponse.json({ status: 200, order });
}