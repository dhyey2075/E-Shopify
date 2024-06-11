import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Cart from "@/app/models/cart.js";
import Product from "@/app/models/product.js";

export async function GET(reqq) {
    await connectToMongoDB();
    const { searchParams } = new URL(reqq.url);
    const query = Object.fromEntries(searchParams.entries());
    if(!query.email){
        return NextResponse.json({ status: 400, message: 'Invalid request' });
    }

    console.log(query);

    const cart = await Cart.find(query);

    const cartWithProductInfo = await Promise.all(
        cart.map(async (product) => {
            const productDetails = await Product.findById(product.productID);
            return {
                ...product.toObject(),
                productInfo: productDetails
            };
        })
    );

    return NextResponse.json({ status: 200, cart: cartWithProductInfo});
}
