import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Order from "@/app/models/order.js";

export async function GET(reqq) {
    await connectToMongoDB();

    const { searchParams } = new URL(reqq.url);
    const query = Object.fromEntries(searchParams.entries());

    console.log(query);
    if(!query.email){
        return NextResponse.json({ status: 400, message: "Invalid request" });
    }

    const order = await Order.find(query);

    return NextResponse.json({ status: 200, order:order[order.length - 1] });
}
