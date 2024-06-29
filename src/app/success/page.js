"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Page = () => {
    const [order, setOrder] = useState({});

    useEffect(() => {
        const storedOrder = JSON.parse(sessionStorage.getItem('order'));
        setOrder(storedOrder);

        if (storedOrder && storedOrder.email) {
            sendEmailToServer(storedOrder.email, storedOrder);
        }
        toast.info('Order details have been sent to your Email.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
    }, []);

    const sendEmailToServer = async (email, orderData) => {
        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, order: orderData }),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className='flex flex-col space-y-5 items-center'>
            <div className='flex justify-center items-center text-center'>
                <Image src={"https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"} height={500} width={500} />
            </div>
            <h1 className='text-center text-3xl text-green-700 font-extrabold'>Payment Successfully</h1>
            <Link href={'/'}>
                <button className="w-44 mx-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Continue Shopping</button>
            </Link>
        </div>
    );
};

export default Page;
