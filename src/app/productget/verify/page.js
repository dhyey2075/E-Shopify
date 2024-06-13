"use client";
import React, { useEffect, useState } from 'react'

const Verify = () => {
    const [order, setOrder] = useState({})
    const fetchOrder = async () => {
        const res = sessionStorage.getItem('order');
        const data = JSON.parse(res)
        setOrder(data)
        return data
    }
    useEffect(() => {
        fetchOrder()
        console.log("verify")
    },[])
    useEffect(() => {
        console.log("Fetched Order",order)
    },[order])
  return (
    <div>
        <strong><h1 className='text-3xl text-center text-green-600' >Order Verification</h1></strong>
        <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Order Verification</h2>
      { order.email && <><div className="mb-4">
        <p className="text-gray-700"><strong>Email:</strong> {order.email}</p>
        <p className="text-gray-700"><strong>Product ID:</strong> {order.products[0].productID}</p>
        <p className="text-gray-700"><strong>Quantity:</strong> {order.products[0].quantity}</p>
        <p className="text-gray-700"><strong>Price:</strong> {order.products[0].price}</p>
        <p className="text-gray-700"><strong>Total Amount:</strong> {parseInt(order.products[0].productID) * parseInt(order.products[0].quantity)}</p>
        <p className="text-gray-700"><strong>Status:</strong> {order.status}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Shipping Address:</h3>
        <p className="text-gray-700"><strong>Street:</strong> {order.shippingAddress.street}</p>
        <p className="text-gray-700"><strong>City:</strong> {order.shippingAddress.city}</p>
        <p className="text-gray-700"><strong>State:</strong> {order.shippingAddress.state}</p>
        <p className="text-gray-700"><strong>Postal Code:</strong> {order.shippingAddress.postalCode}</p>
        <p className="text-gray-700"><strong>Country:</strong> {order.shippingAddress.country}</p>
      </div>
      <p className="mb-4 text-gray-700"><strong>Payment Method:</strong> {order.paymentMethod}</p></>}
    </div>
    </div>
  )
}

export default Verify