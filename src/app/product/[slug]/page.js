"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const fetchProductData = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/getproduct?category=${slug}`);
    const data = await res.json();
    return data;
}

const Page = ({ params }) => {
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

    const handleClick = (id) => {
        console.log('clicked');
        console.log(id)
    }

    return (
        <>
            <h1 className='text-3xl text-center mt-7 font-bold'>{params.slug}</h1>
            {loading && <h1>Loading...</h1>}
            {
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-10 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            
                            {ans.products && ans.products.map((product, index) => {
                                return (
                                    <div onClick={()=>handleClick(product._id)} key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                        <Link href={`/productget/${product._id}`}>
                                        <a className="block relative h-48 rounded overflow-hidden">
                                            <img alt="ecommerce" className="object-center w-full h-full object-contain block" src={product.images[0]} />
                                        </a>
                                        <div className="mt-4">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                                            <p className="mt-1">${product.price}</p>
                                        </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

            }
        </>
    );
}

export default Page;
