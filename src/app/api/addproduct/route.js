import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Product from "@/app/models/product.js";

export async function POST(reqq, res){
    await connectToMongoDB();
    const req = await reqq.json();
    const { name, description, price, category, brand, stock, specifications,images } = req;
    const product = await new Product({ name, description, price, category, brand, stock, specifications,images });
    await product.save();
    return NextResponse.json({ status: 200, product });
}