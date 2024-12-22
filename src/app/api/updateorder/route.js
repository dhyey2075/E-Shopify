import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Order from "@/app/models/order.js";

export async function POST(reqq) {
    const req = await reqq.json();
    // console.log(req);
    // return NextResponse.json({ status: 200, req });
    
    await connectToMongoDB();
    try{
        const orders = await Order.findByIdAndUpdate(req.id, { status: req.status }, { new: true });
        return NextResponse.json({ status: 200, orders });
    }catch(err){
        return NextResponse.json({ status: 500, message: err.message });
    }
    // await connectToMongoDB();
    try{
        const orders = await Order.find({});
        return NextResponse.json({ status: 200, orders });
    }catch(err){
        return NextResponse.json({ status: 500, message: err.message });
    }

}