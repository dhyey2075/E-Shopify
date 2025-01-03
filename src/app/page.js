'use client';
import Image from "next/image";
import Navbar from "@/app/components/Navbar.js";
import Footer from "@/app/components/Footer.js";
import Link from "next/link";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { toast, Bounce } from 'react-toastify';
export default function Home() {
  const [email, setEmail] = useState("");

  const _showToast = () => {
    // alert("Your subscribtion request has been successfully");
    toast.info('Your subscribtion request has been successfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }

  return (
    <div>

      <div className="text-center bg-contain">
        <Image src={"https://m.media-amazon.com/images/G/31/Laptops/May24_BrandBanners/Samsung_Combo_1500x300._CB556431508_.jpg"}
          height={400}
          width={1000}
          style={{
            margin: "auto",
          }}
          alt="banner" />
        <Image src={"https://m.media-amazon.com/images/G/31/Laptops/May24_Smartchoice-laptops/Header_Smartchoice_1500._CB555891373_.jpg"}
          height={400}
          width={1000}
          style={{
            margin: "auto",
          }}
          alt="banner" />
        <Image src={"https://m.media-amazon.com/images/G/31/img23/CEPC/OTC/banner/OTC_Header_1500-x-300._CB556740806_.gif"}
          height={400}
          width={1000}
          sizes="100vw"
          style={{
            margin: "auto",
          }}
          alt="banner" />
        <Image src={"https://m.media-amazon.com/images/G/31/img24/MED/June/MED_Header_1500X300._CB555010163_.jpg"}
          height={400}
          width={1000}
          style={{
            margin: "auto",
          }}
          alt="banner" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="md:flex md:flex-row flex flex-col items-center justify-center md:overflow-x-auto md:space-x-4">
          <div className="h-80 flex flex-col justify-between w-64 border rounded-lg p-4 shadow-md">
            <Link href={'/productget/6667e5bb4a36699b181a1d91'}>
              <Image
                src={"https://m.media-amazon.com/images/I/81T1jtBiebL.jpg"}
                alt={"here"}
                width={200}
                height={200}
                className="mx-auto"
              />
            </Link>
              <h3 className="text-xl font-semibold mt-4">HP Spectre x360 14</h3>
              <p className="text-gray-600 mt-2">$1299.99</p>
          </div>
          <div className="h-80 flex flex-col justify-between w-64 border rounded-lg p-4 shadow-md">
            <Link href={'/productget/6666ce03889076044731df10'}>
              <Image
                className="mx-auto w-32"
                src={"https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_UF1000,1000_QL80_.jpg"}
                alt={"here"}
                width={200}
                height={100}
              />
            </Link>
              <h3 className="text-xl font-semibold mt-4">IPhone 15 Pro Max - White</h3>
              <p className="text-gray-600 mt-2">$3499.99</p>
          </div>
          <div className="h-80 flex flex-col justify-between w-64 border rounded-lg p-4 shadow-md">
            <Link href={'/productget/66697aa496646dac29c8184c'}>
              <Image
                className="mx-auto w-32"
                src={"https://m.media-amazon.com/images/I/31O-GbBhP3L._AC_.jpg"}
                alt={"here"}
                width={200}
                height={100}
              />
            </Link>
              <h3 className="text-xl font-semibold mt-4">Samsung Galaxy S23 Ultra</h3>
              <p className="text-gray-600 mt-2">$3499.99</p>
          </div>
          <div className="h-80 flex flex-col justify-between w-64 border rounded-lg p-4 shadow-md">
            <Link href={'/productget/66697aa496646dac29c81850'}>
              <Image
                className="mx-auto w-32"
                src={"https://m.media-amazon.com/images/I/71LQ3LXA8mL.jpg"}
                alt={"here"}
                width={200}
                height={100}
              />
            </Link>
              <h3 className="text-xl font-semibold mt-4">Apple Watch Series 8</h3>
              <p className="text-gray-600 mt-2">$3499.99</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="md:flex md:flex-row flex flex-col items-center justify-center md:overflow-x-auto md:space-x-4">
            <div  className="h-72 flex flex-col justify-between w-64 border rounded-lg p-4 shadow-md text-center">
              <Link href={`/product/Laptops`}>
                <Image
                  src="https://m.media-amazon.com/images/G/31/img15/zak/24/dell/laptop-header_mob._SX1242_QL85_FMpng_.png"
                  alt="Laptops"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </Link>
                <h3 className="text-xl font-semibold mt-4">Laptops</h3>
            </div>
            <div className="h-72 flex flex-col justify-between w-64 border rounded-lg p-4 shadow-md text-center">
              <Link href={`/product/Mobiles`}>
                <Image
                  src="https://m.economictimes.com/thumb/msid-109838339,width-1200,height-900,resizemode-4,imgsize-85532/mobile.jpg"
                  alt="Laptops"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </Link>
                <h3 className="text-xl font-semibold mt-4">Mobiles</h3>
            </div>
            <div  className="h-72 flex flex-col justify-between w-64 border rounded-lg p-4 shadow-md text-center">
              <Link href={`/product/Gadgets`}>
                <Image
                  src="https://m.media-amazon.com/images/I/61wqPARW0CL._CR0,0,948,948_._FMjpg_.jpg"
                  alt="Laptops"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </Link>
                <h3 className="text-xl font-semibold mt-4">Gadgets</h3>
            </div>
            <div  className="h-72 flex flex-col justify-between w-64 border rounded-lg p-4 shadow-md text-center">
              <Link href={`/product/Storages`}>
                <Image
                  src="https://images.fonearena.com/blog/wp-content/uploads/2024/03/World-Backup-Days-Amazon-deals-2024-1024x434.jpg"
                  alt="Laptops"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </Link>
                <h3 className="text-xl font-semibold mt-4">Storages</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-500 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="mb-4">Get the latest updates on new products and upcoming sales</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="text-black px-4 py-2 rounded w-full max-w-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div></div>
          <button className="mt-4 bg-white text-blue-500 py-2 px-4 rounded" onClick={_showToast} >Subscribe</button>
        </div>
      </div>

    </div>
  );
}
