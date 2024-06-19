import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
    return (
        <div className='flex flex-col space-y-5 items-center'>
            <div className='flex justify-center items-center text-center'>
                <Image src={"https://i.pinimg.com/originals/6e/f9/f2/6ef9f2fd6425c578274e72ce1f44a778.gif"} height={500} width={500} />
            </div>
            <h1 className='text-center text-3xl text-green-700 font-extrabold ' >Payment Failed. Please try again</h1>
            <Link href={'/'}> <button className="w-44 mx-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600" >Continue Shopping</button> </Link>
        </div>
    )
}

export default page