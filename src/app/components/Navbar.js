"use client";
import React, { useState, useEffect } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleDoubleClick = () => {
    console.log("Double Clicked");
    
    router.push('/admin');
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between bg-blue-500 p-4 items-center shadow-lg">
      {/* Logo and Menu Button */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center">
          <Image
            src="https://w7.pngwing.com/pngs/833/276/png-transparent-e-commerce-shopify-logo-web-design-magento-shopping-cart-grass-business-internet-thumbnail.png"
            height={50}
            width={50}
            alt="Logo"
            className="mr-2"
          />
          <button onClick={handleDoubleClick} ><div className="logo text-2xl font-semibold text-white">E-Shopify</div></button>
        </div>
        {isMobile && (
          <button
            onClick={handleMenuClick}
            className="text-white text-2xl focus:outline-none md:hidden"
          >
            <IoMdMenu />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      {(isMenuOpen || !isMobile) && (
        <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-8">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-white text-lg">
            <li className="hover:underline transition-all cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:underline transition-all cursor-pointer">
              <Link href="/product/Laptops">Laptops</Link>
            </li>
            <li className="hover:underline transition-all cursor-pointer">
              <Link href="/product/Mobiles">Mobiles</Link>
            </li>
            <li className="hover:underline transition-all cursor-pointer">
              <Link href="/product/Gadgets">Gadgets</Link>
            </li>
            <li className="hover:underline transition-all cursor-pointer">
              <Link href="/product/Storages">Storages</Link>
            </li>
            <li className="hover:underline transition-all cursor-pointer">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:underline transition-all cursor-pointer">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      )}

      {/* User Info and Search */}
      <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0 md:space-x-6 text-white text-lg">
        {session ? (
          <div className="flex items-center space-x-3">
            <Image
              className="rounded-full"
              height={40}
              width={40}
              src={session.user.image}
              alt="User Image"
            />
            <span>{session.user.name}</span>
            <button
              className="bg-pink-600 px-4 py-1 rounded-md hover:bg-pink-700 transition-all"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            className="bg-pink-600 px-4 py-1 rounded-md hover:bg-pink-700 transition-all"
            onClick={() => signIn()}
          >
            Log in
          </button>
        )}
        <div className="flex items-center space-x-2">
          <input
            onChange={handleChange}
            value={search}
            className="w-full md:w-auto p-2 border-2 border-gray-300 rounded-lg text-black placeholder-gray-500 focus:border-blue-600 focus:outline-none"
            type="text"
            placeholder="Search here"
          />
          <Link href={`/products/${search}`}>
            <FaSearch className="text-white text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Cart */}
      <div className="mt-4 md:mt-0">
        <Link href="/mycart" className="flex items-center text-white">
          <CiShoppingCart className="text-3xl mr-1" /> My Cart
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
