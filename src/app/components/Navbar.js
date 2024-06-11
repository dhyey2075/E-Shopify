"use client"
import React from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';


const Navbar = () => {
  const { data: session } = useSession()
  console.log(session)

  return (
    <div className="w-full flex flex-col md:justify-between align-bottom md:flex-row md:w-full bg-slate-600 p-4 pt-6">
      <div className="logo mx-4 md:mx-28 text-white text-lg">
        E-Shofify
      </div>
      <div className="flex flex-col md:flex-row text-xl">
        <ul className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-10 text-white'>
          <li className="hover:underline cursor-pointer"><Link href={'/'}>Home</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/product/Laptops'}>Laptops</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/product/Mobiles'}>Mobiles</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/product/Gadgets'}>Gadgets</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/product/Storages'}>Storages</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/about'}>About</Link></li>
          <li className="hover:underline cursor-pointer"><Link href={'/contact'}>Contact</Link></li>
        </ul>
      </div>

      <div className="mx-4 md:mx-28 text-white text-lg">
        <span className="info">
          {
            session && <>
              {session.user.name}
              <button className='bg-pink-600 px-5 py-1 mx-3' onClick={() => signOut()}>Sign out</button>
            </>
          }
          {!session && <button className='bg-pink-600 px-5 py-1 mx-3' onClick={() => signIn()}>Log in</button>}

        </span>
        
          <CiShoppingCart className='inline-block text-4xl' />My Cart
        
      </div>
    </div>
  )
}

export default Navbar;
