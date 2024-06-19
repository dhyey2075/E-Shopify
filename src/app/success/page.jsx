import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
    return (
        <div className='flex flex-col space-y-5 items-center'>
            <div className='flex justify-center items-center text-center'>
                <Image src={"https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"} height={500} width={500} />
            </div>
            <h1 className='text-center text-3xl text-green-700 font-extrabold ' >Payment Successfully</h1>
            <Link href={'/'}> <button className="w-44 mx-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600" >Continue Shopping</button> </Link>
        </div>
    )
}

export default page