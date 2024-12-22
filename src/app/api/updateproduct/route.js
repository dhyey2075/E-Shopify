import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/app/db.js";
import Product from "@/app/models/product.js";

export async function POST(reqq, res) {
  await connectToMongoDB();
  const req = await reqq.json();
  const { name, description, price, category, brand, stock, specifications, images } = req;

  const pro = await Product.findOneAndUpdate(
    { name: name },
    {
      description: description,
      price: price,
      category: category,
      brand: brand,
      stock: stock,
      specifications: specifications,
      images: images,
    },
    { new: true } // This option returns the updated document
  ).lean(); // This method returns a plain JavaScript object

  if (!pro) {
    return NextResponse.json({ status: 404, message: "Product not found" });
  }

  // Extract only relevant parts of the response to avoid circular references
  const response = {
    name: pro.name,
    description: pro.description,
    price: pro.price,
    category: pro.category,
    brand: pro.brand,
    stock: pro.stock,
    specifications: pro.specifications,
    images: pro.images,
  };

  return NextResponse.json({ status: 200, product: response });
}
