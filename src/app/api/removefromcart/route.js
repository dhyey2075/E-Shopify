import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Cart from "@/app/models/cart.js";


export async function GET(reqq) {
    await connectToMongoDB();
    const { searchParams } = new URL(reqq.url);
    const query = Object.fromEntries(searchParams.entries());
    if(!query.productID){
        return NextResponse.json({ status: 400, message: 'Invalid request' });
    }

    console.log(query);

    const cart = await Cart.findOneAndDelete({productID: query.productID});


    return NextResponse.json({ status: 200, cart });
}
