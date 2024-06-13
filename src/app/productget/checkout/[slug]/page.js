"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import Link from 'next/link';

const fetchProductData = async (slug) => {
    const res = await fetch(`/api/getbyid?id=${slug}`);
    const data = await res.json();
    return data;
}

const Page = ({ params }) => {
    const { data: session } = useSession()
    const [ans, setAns] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        productID: '',
        quantity: 1,
        price: 0,
        totalAmount: 0,
        status: 'Pending',
        shippingAddress: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        paymentMethod: 'Credit Card'
    });

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            try {
                const res = await fetchProductData(params.slug);
                setAns(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [params.slug]);
    useEffect(() => {
        console.log(ans);
        
    }, [ans]);

    //Order Form starts here

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setFormData(prevState => ({
            ...prevState,
            "price": ans.products.price,
            "productID": ans.products._id,
            "email": session.user.email,
            "totalAmount": ans.products.price * formData.quantity,
        }));
    };

    const handleNestedChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            shippingAddress: {
                ...prevState.shippingAddress,
                [name]: value
            }
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(ans)
        const res = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: session.user.email, products:[{ productID: formData.productID, quantity: formData.quantity, price: formData.price }], totalAmount: formData.totalAmount, status: formData.status, shippingAddress: formData.shippingAddress, paymentMethod: formData.paymentMethod})
        });
        const data = await res.json();
        console.log("Order submitted", data);
        const orderDetails = { email: session.user.email, products:[{ productID: formData.productID, quantity: formData.quantity, price: formData.price }], totalAmount: formData.totalAmount, status: formData.status, shippingAddress: formData.shippingAddress, paymentMethod: formData.paymentMethod};
        sessionStorage.setItem('order', JSON.stringify(orderDetails));
        console.log("saved to session");
        console.log(sessionStorage.getItem('order'));
        setFormData({
            email: '',
            productID: '',
            quantity: 1,
            price: 0,
            totalAmount: 0,
            status: 'Pending',
            shippingAddress: {
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            },
            paymentMethod: 'Credit Card'
        });
        
    };
    useEffect(() => {
        // setFormData(prevState => ({
        //     ...prevState,
        //     "price": ans.products && ans.products.price,
        //     "productID": ans.products && ans.products._id,
        //     "totalAmount": ans.products && ans.products.price * formData.quantity,
        // }));
        console.log('Order Details:', formData);

    },[formData])

    return (
        <div>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 lg:h-autorounded object-center w-full h-64 object-contain block"
                            src={ans.products && ans.products.images[0]}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                {ans.products && ans.products.brand}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {ans.products && ans.products.name}
                            </h1>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-indigo-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                    </a>
                                    <a className="text-gray-500">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed">
                                <strong>Description:</strong> <br />
                                {ans.products && ans.products.description}
                            </p>
                            <p>
                                <strong className='my-10'>Specifications:</strong>
                                {ans.products && ans.products.specifications && (
                                    <ul>
                                        {Object.entries(ans.products.specifications).map(([key, value]) => (
                                            <li key={key}>
                                                <strong>{key}:</strong> {value}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </p>
                            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                                <div className="flex ml-6 items-center">
                                    <div className="relative">
                                        {/* <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                             <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-4 h-4"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M6 9l6 6 6-6" />
                                            </svg> 
                                        </span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-gray-900">
                                    ₹{ans.products && ans.products.price}
                                </span><br />
                                {ans.products && <Link href={`checkout/${ans.products._id}`}>
                                </Link>}
                                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Order Product</h2>
                
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        min="1"
                        required
                    />
                </div>
                
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.shippingAddress.street}
                        onChange={handleNestedChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.shippingAddress.city}
                        onChange={handleNestedChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="state">State</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.shippingAddress.state}
                        onChange={handleNestedChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="postalCode">Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.shippingAddress.postalCode}
                        onChange={handleNestedChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.shippingAddress.country}
                        onChange={handleNestedChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="paymentMethod">Payment Method</label>
                    <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit Order</button>
            </form>
               <Link href={'/productget/verify'}> <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" >Verify</button> </Link>
        </div>
    )
}

export default Page