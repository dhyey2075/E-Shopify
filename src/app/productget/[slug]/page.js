"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        
    }, [ans]);

    const handleAdd = async (e) => {
        if(!session){
            toast.error('Please Login to add to cart!', {
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
            return
        }
        e.preventDefault();
        let res;
        try{
            res = await fetch('/api/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: session.user.name, email: session.user.email, product:ans.products }),
            })
        }catch(error){
            toast.error('Failed to add product in cart.', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
                });
        }
        const data = await res.json();
        console.log(data)
        if(data.message==="Product already in cart."){
            toast.error('Product already added to cart.', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce
                });
            return
        }
        toast.success('Product added to cart!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
            });
    }
    return (
        <div>
  <section className="text-gray-600 body-font overflow-hidden bg-gray-50">
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white shadow-lg rounded-lg p-6">
        {/* Product Image */}
        <img
          alt="ecommerce"
          className="lg:w-1/2 lg:h-auto rounded object-center w-full h-64 object-contain block border border-gray-200"
          src={ans.products && ans.products.images[0]}
        />

        {/* Product Details */}
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase">
            {ans.products && ans.products.brand}
          </h2>
          <h1 className="text-gray-900 text-3xl title-font font-bold mb-1">
            {ans.products && ans.products.name}
          </h1>

          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex text-indigo-500">
              {Array(4)
                .fill()
                .map((_, i) => (
                  <svg
                    key={i}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-4 h-4"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span className="ml-3 text-gray-600">4 Reviews</span>
          </div>

          {/* Description */}
          <p className="leading-relaxed text-gray-700">
            <strong>Description:</strong>
            <br />
            {ans.products && ans.products.description}
          </p>

          {/* Specifications */}
          <div className="my-5">
            <strong className="text-lg">Specifications:</strong>
            {ans.products && ans.products.specifications && (
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {Object.entries(ans.products.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Color Options */}
          <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
            <div className="flex">
              <span className="mr-3 text-gray-700">Color</span>
              <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
              <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
              <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none" />
            </div>

            {/* Stock */}
            <div className="flex ml-6 items-center">
              <span className="mr-3 text-gray-700">Stock</span>
              <span className="text-gray-600">
                {ans.products && ans.products.stock == 0
                  ? "Out of Stock"
                  : `${ans.products && ans.products.stock} Available`}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center mb-5">
            <span className="title-font font-medium text-2xl text-gray-900">
              ₹{ans.products && ans.products.price}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            {ans.products && (
              <Link href={`checkout/${ans.products._id}`}>
                <button className="flex text-white bg-orange-600 border-0 py-2 px-6 focus:outline-none hover:bg-orange-700 rounded">
                  BUY NOW
                </button>
              </Link>
            )}
            <button
              onClick={(e) => handleAdd(e)}
              className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

    )
}

export default Page