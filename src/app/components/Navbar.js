"use client"
import React, { useState, useEffect } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {
  const { data: session } = useSession()
  console.log(session)
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false) // Initial value [false
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as per your design
    };

    handleResize(); // Call once to set initial state

    window.addEventListener('resize', handleResize); // Add listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up listener on unmount
    };
  }, []);


  return (
    <div className="flex flex-col md:flex-row md:justify-between bg-blue-500 p-4 pt-6 items-center">
      <div className='flex'>
        <div className="logo text-3xl mx-4 md:mx-28 text-white">
          E-Shopify
        </div>

        <div>
        {isMobile && (
          <button onClick={handleMenuClick} className="mt-1 md:hidden">
            <IoMdMenu className='inline-block mx-1  text-2xl' />
            Menu
          </button>
        )}
        </div>
      </div>
      {/* Conditional rendering of menu content for mobile */}
      {isMenuOpen && isMenuOpen && <div className="flex flex-col md:flex-row text-xl transition-all duration-500 ease-in-out">
        <ul className='flex flex-col lg:flex-row space-y-2 md:space-y-0 md:space-x-10 text-white'>
          <li className="mx-4 hover:text-2xl transition-all cursor-pointer"><Link href={'/'}>Home</Link></li>
          <li className="mx-4 hover:text-2xl transition-all cursor-pointer"><Link href={'/product/Laptops'}>Laptops</Link></li>
          <li className="mx-4 hover:text-2xl transition-all cursor-pointer"><Link href={'/product/Mobiles'}>Mobiles</Link></li>
          <li className="mx-4 hover:text-2xl transition-all cursor-pointer"><Link href={'/product/Gadgets'}>Gadgets</Link></li>
          <li className="mx-4 hover:text-2xl transition-all cursor-pointer"><Link href={'/product/Storages'}>Storages</Link></li>
          <li className="mx-4 hover:text-2xl transition-all cursor-pointer"><Link href={'/about'}>About</Link></li>
          <li className="mx-4 hover:text-2xl transition-all cursor-pointer"><Link href={'/contact'}>Contact</Link></li>
        </ul>
      </div>}

      <div className="mx-4 my-6 md:mx-28 text-white text-lg">
        <span className="info">
          {
            session && <>
              <Image className='inline-block mx-3 rounded-full ' height={50} width={50} src={session.user.image} />
              {session.user.name}
              <button className='bg-pink-600 px-5 py-1 mx-3' onClick={() => signOut()}>Sign out</button>
            </>
          }
          {!session && <button className='bg-pink-600 px-5 py-1 mx-3' onClick={() => signIn()}>Log in</button>}

        </span>



      </div>
      <div>
        <Link href={'/mycart'}><CiShoppingCart className='inline-block text-4xl' />My Cart</Link>
      </div>
    </div>
  )
}

export default Navbar;
