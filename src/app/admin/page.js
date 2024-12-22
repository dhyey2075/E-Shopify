'use client';
import React from 'react'
import { useRouter } from 'next/navigation'

const AdminPage = () => {
    const router = useRouter();
    return (
        <div className='flex justify-center'>
            <button onClick={router.push('admin/addproduct')} ><div>
                Add Product
            </div></button>
            <button onClick={router.push('admin/updateproducts')} ><div>
                Update Products
            </div></button>
            <button onClick={router.push('admin/updateorders')} ><div>
                Update Orders
            </div></button>
        </div>
    )
}

export default AdminPage