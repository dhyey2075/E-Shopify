"use client";
import React,{useEffect, useState} from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react"
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Mycart = () => {
    const { data: session, status } = useSession();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(false);

    useEffect(() => {
        console.log("session");
        setLoading(true);
        const fetchData = async () => {
            if (status === "authenticated") {
                console.log(session.user.email);
                const res = await fetch(`/api/getcart?email=${session.user.email}`);
                const data = await res.json();
                setData(data);
            }
        };
        fetchData();
        setLoading(false);
    }, [session, status, change]);

    useEffect(() => {
        console.log(data);
    }, [data]);

    const cartTotal = () => {
        let total = 0;
        data.cart && data.cart.map((item) => {
            total += item.product.price;
        });
        return total;
    }

    const handleDelete = async (id) => {
        alert("Are you sure you want to remove this product from your cart?")
        if(alert){
        console.log(id);
        const res = await fetch(`api/removefromcart?productID=${id}`);
        const data = await res.json();
        toast.success('Product removed from your cart.', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        setChange(!change);
        console.log(data);
        }
    }

    return (

        


        <div>
            <h1 className='text-3xl text-center mt-7 font-bold'>My Cart</h1>
            {loading && <h1 className='my-3 text-3xl text-center'>Loading...</h1>}
            {!session && <h1 className='my-3 text-3xl text-center'>Please login to view your cart.</h1>}
            {data.cart && data.cart.length === 0 && <h1 className='my-3 text-3xl text-center'>No items in cart.</h1>}
            {data.cart && data.cart.length > 0 && <h1 className='my-3 text-3xl text-center'>Cart Total: ${cartTotal().toString().split(".")[0]}</h1>}
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-wrap -m-4">

                    {data.cart && data.cart.map((item, index) => {
                        return (
                            <div  key={item.product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                    <Link href={`/productget/${item.product._id}`}>
                                    <p className="block relative h-48 rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-center w-full h-full object-contain block" src={item.product.images[0]} />
                                    </p>
                                    </Link>
                                    <div className="mt-4">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.product.category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{item.product.name}</h2>
                                        <p className="mt-1">${item.product.price}</p>
                                        <button onClick={()=>handleDelete(item.product._id)} id={item.product._id} className='bg-red-600 text-white px-6 py-2 border-blue-500' >Remove from cart</button>
                                    </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Mycart