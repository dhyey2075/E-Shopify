import Image from "next/image";
import Navbar from "@/app/components/Navbar.js";
import Footer from "@/app/components/Footer.js";
import Link from "next/link";
export default function Home() {
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
        <div className="flex justify-center overflow-x-auto space-x-4">
          <div className="flex-none w-64 border rounded-lg p-4 shadow-md">
            <Link href={'/productget/6667e5bb4a36699b181a1d91'}>
            <Image
              src={"https://m.media-amazon.com/images/I/81T1jtBiebL.jpg"}
              alt={"here"}
              width={200}
              height={200}
              className="mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">HP Spectre x360 14</h3>
            <p className="text-gray-600 mt-2">$1299.99</p>
            </Link>
          </div>
          <div className="flex-none w-64 border rounded-lg p-4 shadow-md">
            <Link href={'/productget/6666ce03889076044731df10'}>
            <Image
              className="mx-auto w-32"
              src={"https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_UF1000,1000_QL80_.jpg"}
              alt={"here"}
              width={200}
              height={100}
            />
            <h3 className="text-xl font-semibold mt-4">IPhone 15 Pro Max - White</h3>
            <p className="text-gray-600 mt-2">$3499.99</p>
            </Link>
          </div>
          <div className="flex-none w-64 border rounded-lg p-4 shadow-md">
            <Link href={'/productget/66697aa496646dac29c8184c'}>
            <Image
              className="mx-auto w-32"
              src={"https://m.media-amazon.com/images/I/31O-GbBhP3L._AC_.jpg"}
              alt={"here"}
              width={200}
              height={100}
            />
            <h3 className="text-xl font-semibold mt-4">Samsung Galaxy S23 Ultra</h3>
            <p className="text-gray-600 mt-2">$3499.99</p>
            </Link>
          </div>
          <div className="flex-none w-64 border rounded-lg p-4 shadow-md">
            <Link href={'/productget/66697aa496646dac29c81850'}>
              <Image
                className="mx-auto w-32"
                src={"https://m.media-amazon.com/images/I/71LQ3LXA8mL.jpg"}
                alt={"here"}
                width={200}
                height={100}
              />
              <h3 className="text-xl font-semibold mt-4">Apple Watch Series 8</h3>
              <p className="text-gray-600 mt-2">$3499.99</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="flex justify-center overflow-x-auto space-x-4">
            {["Laptops", "Mobiles", "Gadgets", "Storages"].map((category, index) => (
              <div key={index} className="flex-none w-64 border rounded-lg p-4 shadow-md text-center">
                <Link href={`/product/${category}`}>
                <Image
                  src="/dhyey.jpg"
                  alt={category}
                  width={200}
                  height={200}
                  className="mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">{category}</h3>
                </Link>
              </div>
            ))}
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
            className="px-4 py-2 rounded w-full max-w-md"
          />
          <button className="mt-4 bg-white text-blue-500 py-2 px-4 rounded">Subscribe</button>
        </div>
      </div>

    </div>
  );
}
