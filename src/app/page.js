import Image from "next/image";
import Navbar from "@/app/components/Navbar.js";
import Footer from "@/app/components/Footer.js";

export default function Home() {
  return (
    <div>
      <div className="text-center bg-contain">
      <Image className="text-center bg-contain inline-block" src="/main-bg.jpg" height={500} width={1000} alt="This is alt text"></Image>
      </div>
      
    </div>
  );
}
