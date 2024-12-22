'use client'
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const updateOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/getorders');
            const data = await res.json();
            console.log(data.orders);

            setOrders(data.orders);
            setLoading(false);
            setStatus(data.orders.status);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, [])

    const changeStatus = async (e, id) => {
        
        const newStatus = status;
        console.log(id, newStatus);
        fetch('http://localhost:3000/api/updateorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                status: newStatus
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        e.target.value = '';
        setStatus('');
        fetchOrders();
        console.log('Orders fetched');
        
    }

    const getOrders = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/getorders?email=${email}`);
            const data = await res.json();
            console.log(data.orders);

            setOrders(data.orders);
            setLoading(false);
            setStatus(data.orders.status);

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    return (
        <div>
            <div className='flex justify-center'>
                <h1 className='text-3xl' >Update Orders</h1>
            </div>
            <div className='flex justify-center'>
                {loading && <div>
                    <Image src={'/loader.gif'} height={100} width={100} />
                </div>}
            </div>
            <div className='flex justify-center space-x-3'>
                <label htmlFor="email" className='text-xl'>Enter Email to search specific orders:</label>
                <input type="email" 
                className='bg-gray-200 border-2 border-gray-500 rounded-lg px-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='flex justify-center space-x-5 py-4'>
            <button onClick={getOrders} className='bg-blue-500 px-4 rounded-md py-2' >Get Orders</button>
            <button onClick={fetchOrders} className='bg-blue-500 px-4 rounded-md py-2' >Get All Orders</button>
            </div>
            <div className='flex justify-center'>
                <h1 className='text-xl'>Total Orders: {orders.length}</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:justify-between lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {
                    orders.map((order) => {
                        return (
                            <div key={order._id} className=''>
                                <div className='flex flex-col bg-gray-200 p-4 m-4 rounded-lg'>
                                    <h1 className='text-xl'>Order ID: {order._id}</h1>
                                    <h1 className='text-xl'>Email: {order.email}</h1>
                                    <h1 className='text-xl'>
                                        {
                                            order.products.map((product) => {
                                                return (
                                                    <ul key={product._id}>
                                                        <li><h1>Product ID: {product.productID}</h1></li>
                                                        <li><h1>Qty: {product.quantity}</h1></li>
                                                        <li><h1>Price: {product.price}</h1></li>
                                                    </ul>
                                                )
                                            })
                                        }
                                    </h1>
                                    <h1 className='text-xl'>Total Price: {order.totalAmount}</h1>
                                    <h1 className='text-xl'>Order Date: {order.updatedAt.split('T')[0]}</h1>
                                    <h1 className='text-xl'>Order Status: {order.status}</h1>
                                    <label htmlFor="status"><h1 className='text-xl'>New Status:</h1></label>
                                    <input type="text"
                                        className='border-2 border-gray-500 p-2 rounded-lg m-5'
                                        onChange={(e) => {
                                            setStatus(e.target.value)
                                        }}
                                    />
                                    <button className='bg-blue-500 p-2 rounded-md text-xl' onClick={(e) => changeStatus(e, order._id)} >Change Status</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default updateOrders