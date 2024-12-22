import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Order from "@/app/models/order.js";

export async function GET(reqq) {
    const { searchParams } = new URL(reqq.url);
    const query = Object.fromEntries(searchParams.entries());
    console.log(query);
    
    await connectToMongoDB();
    const email = searchParams.get('email');
    try{
        const orders = await Order.find(query);
        return NextResponse.json({ status: 200, orders });
    }catch(err){
        return NextResponse.json({ status: 500, message: err.message });
    }
    // await connectToMongoDB();
    // try{
    //     const orders = await Order.find({});
    //     return NextResponse.json({ status: 200, orders });
    // }catch(err){
    //     return NextResponse.json({ status: 500, message: err.message });
    // }

}