import React from 'react';
import { CiShoppingCart } from "react-icons/ci";
import Link from 'next/link';


const Navbar = () => {
  return (
    <div className='flex flex-col md:justify-center align-bottom md:flex-row   bg-slate-600 p-4 pt-6'>
      <div className="logo mx-4 md:mx-28 text-white text-lg">
        E-Shofify
      </div>
      <div className="flex flex-col md:flex-row">
        <ul className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 text-white'>
          <li className="hover:underline cursor-pointer"><Link href={'/'}>Home</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/product/Laptops'}>Laptops</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/product/Mobiles'}>Mobiles</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/product/Gadgets'}>Gadgets</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/product/Storages'}>Storages</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/about'}>About</Link></li>
        </ul>
      </div>
      <div className="cart mx-4 md:mx-28 text-white text-lg">
        <CiShoppingCart className='text-4xl' /> Cart
      </div>
    </div>
  )
}

export default Navbar;
