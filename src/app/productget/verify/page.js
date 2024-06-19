"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import sha256 from "crypto-js/sha256";
import { redirect } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { payment } from "@/app/action/ServerActions";


const Verify = () => {
    const router = useRouter();
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


    const makePayment=async(e)=>{

      e.preventDefault();
  
    //   const transactionid = "Tr-"+uuidv4().toString(36).slice(-6);
  
    //   const payload = {
    //       merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
    //       merchantTransactionId: transactionid,
    //       merchantUserId: 'MUID-'+uuidv4().toString(36).slice(-6),
    //       amount: 10000,
    //       redirectUrl: `http://localhost:3000/api/status/${transactionid}`,
    //       redirectMode: "POST",
    //       callbackUrl: `/api/status/${transactionid}`,
    //       mobileNumber: '9999999999',
    //       paymentInstrument: {
    //         type: "PAY_PAGE",
    //       },
    //     };
    

    // const dataPayload = JSON.stringify(payload);
    // console.log(dataPayload);

    // const dataBase64 = Buffer.from(dataPayload).toString("base64");
    // console.log(dataBase64);

    // const fullURL = dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    // const dataSha256 = sha256(fullURL);

    // const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;
    // console.log("c====",checksum);

    // const UAT_PAY_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    // const response = await axios.post(
    //   UAT_PAY_API_URL,
    //   {
    //     request: dataBase64,
    //   },
    //   {
    //     headers: {
    //       accept: "application/json",
    //       "Content-Type": "application/json",
    //        "X-VERIFY": checksum,
    //     },
    //   }
    // );
    // console.log(response.data.data.instrumentResponse.redirectInfo.url);

  // const redirect=response.data.data.instrumentResponse.redirectInfo.url;
  // router.push(redirect)

    e.preventDefault();
    const redirect = await payment(parseInt(order.products[0].price) * parseInt(order.products[0].quantity));
    console.log("redirect>>>",redirect.url)
     router.push(redirect.url);

  }
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
        <p className="text-gray-700"><strong>Total Amount:</strong> {parseInt(order.products[0].price) * parseInt(order.products[0].quantity)}</p>
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
    {/* <button onClick={makePayment} >Make Payment</button> */}
    <button onClick={makePayment} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" >Pay Using PhonePe</button>

    </div>
  )
}

export default Verify