import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Cart from "@/app/models/cart.js";

export async function POST(reqq, res){
    await connectToMongoDB();
    const req = await reqq.json();
    const { name, email, product } = req;
    const cart = await new Cart({ name, email, productID: product._id, product });
    try{
        const id = await Cart.findOne({ productID: product._id });
        if(id){
            return NextResponse.json({ status: 400, message: "Product already in cart." });
        }
        await cart.save();
    }catch(err){
        NextResponse.json({ status: 500, message: "Failed to add product to cart." });
    }
    
    return NextResponse.json({ status: 200, cart });
}