"use client";
import React, { useState, useEffect } from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProduct = () => {
  const [ans, setAns] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    specifications: '',
    images: '',
  });

  const fetchData = async () => {
    let res = await fetch("http://localhost:3000/api/getproduct");
    setAns(await res.json());
  };

  const toggleClick = (product) => {
    if (!show) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        stock: product.stock,
        specifications: product.specifications,
        images: product.images.join("\n"), // Join images array to a newline-separated string
      });
    }
    setShow(!show);
    console.log(formData.images)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let images = formData.images.split('\n'); // Split the string into an array
    console.log(images)
    const updatedData = {
      ...formData,
      images: images,
    };
    setShow(!show);
    console.log("updated", updatedData)

    try {
      let res = await fetch('/api/updateproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      let data = await res.json();
      toast.success('Product updated successfully!', {
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
      setMessage(`Product updated successfully: ${data.status}`);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setMessage(`Error: ${error.message}`);
    }

    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      stock: '',
      specifications: '',
      images: '',
    });
    fetchData();
  };
  useEffect(()=>{
    console.log("form",formData)
  })

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <section className={`text-gray-600 body-font ${show ? "inset-0 bg-gray-900 bg-opacity-50 filter blur-lg" : ""}`}>
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4">
            {ans.products && ans.products.map((product, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-center w-full h-full object-contain block" src={product.images[0]} />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Category: {product.category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">Name: {product.name}</h2>
                  <p>Desc: {product.description}</p>
                  <p className="mt-1">${product.price}</p>
                  <p>Brand: {product.brand}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Specifications:</p>
                  {product.specifications && typeof product.specifications === 'object' && (
                    <div>
                      {Object.keys(product.specifications).map((key) => (
                        <p key={key}>{key}: {product.specifications[key]}</p>
                      ))}
                    </div>
                  )}
                  <button
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={() => toggleClick(product)} // Correctly wrap the function call
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {show && (
        <div className="absolute top-48 left-0 flex mt-4 mr-4 w-full justify-center">
          <form className=' w-1/2 flex flex-col' action="POST" onSubmit={handleSubmit}>
            <label htmlFor="namr">Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="block mb-2 border p-2 rounded-lg"
              required true
            />
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="block mb-2 border p-2 rounded-lg"
            />
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="block mb-2 border p-2 rounded-lg"
            />
            <label htmlFor="desc">Description:</label>
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block mb-2 border p-2 rounded-lg"
            />
            <label htmlFor="images">Images:</label>
            <input
              type="text"
              placeholder="Images"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="block mb-2 border p-2 rounded-lg"
            />
            <div className='flex space-x-7'>
              <button type='submit' className='bg-blue-500 px-10 rounded-lg py-3' >Update Product</button>
              <button onClick={()=>{setShow(!show)}}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
