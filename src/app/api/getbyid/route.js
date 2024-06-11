import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Product from "@/app/models/product.js";

export async function GET(reqq) {
    await connectToMongoDB();

    const { searchParams } = new URL(reqq.url);
    const query = Object.fromEntries(searchParams.entries());

    console.log(query);

    const products = await Product.findById(query.id);

    return NextResponse.json({ status: 200, products });
}
