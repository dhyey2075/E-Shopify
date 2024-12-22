"use client"
import { useEffect, useState } from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage() {
  const [message, setMessage] = useState("")
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let images = formData.images.split('\n');
    let specsArray = formData.specifications.split('\n');
    let specs = {};

    specsArray.forEach(spec => {
      let [key, value] = spec.split(':');
      if (key && value) {
        specs[key.trim()] = value.trim();
      }
    });

    const updatedData = {
      ...formData,
      images: images,
      specifications: specs
    };

    try {
      let res = await fetch('/api/addproduct', {
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
      toast.success('Product added successfully!', {
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
      setMessage(`Product added successfully: ${data.status}`);
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
  };

  useEffect(()=>{
    console.log(formData);
  },[formData])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                required="true"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                required="true"
                value={formData.description}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                required="true"
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                required="true"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                required="true"
                value={formData.brand}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                required="true"
                value={formData.stock}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Specifications(enter each specs in new line and seperate spec to value with ':')</label>
              <textarea
                name="specifications"
                required="true"
                value={formData.specifications}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Images</label>
              <textarea
                type="text"
                name="images"
                required="true"
                value={formData.images}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
