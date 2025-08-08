import React from 'react'
import categories from '../tools/categories.js';
import { useProductApi } from '../api/productApi.js';
import { useState } from 'react';

function EditProductForm({ product, onClose }) {
  const { EditTheProducts } = useProductApi();
  const [ formData, setFormData ] = useState({ ...product });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await EditTheProducts(product._id, formData);
    onClose();
  };
    return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>Edit Products</h2>
            
            <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-300'>Product Name</label>
              <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500' />
            </div>

            <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-300'>Product Description</label>
              <textarea id='description' name='description'  value={formData.description} onChange={handleChange} required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'  />
            </div>

            <div>
              <label htmlFor='quantity' className='block text-sm font-medium text-gray-300'>Product Quantity</label>
              <input type='number' id='quantity' name='quantity' value={formData.quantity} onChange={handleChange} required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'  />
            </div>

            <div>
              <label htmlFor='price' className='block text-sm font-medium text-gray-300'>Product Price</label>
              <input type='number' id='price' name='price' value={formData.price} onChange={handleChange}  required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'  />
            </div>

            <div>
              <label htmlFor='category' className='block text-sm font-medium text-gray-300'>Product Category</label>
              <select id='name' name='category' value={formData.category} onChange={handleChange} required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500' >
                <option value=''>Select a category</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}> {category.name} </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor='image' className='block text-sm font-medium text-gray-300'>Product Image</label>
              <input
                type='file'
                id='image'
                name='image'
                accept='image/*'
                className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'/>
            </div>
            
            <div className='flex justify-end space-x-2'>
                <button type='submit' className='px-4 py-2 bg-green-400 rounded text-white'>Update</button>
                <button type='button' onClick={onClose} className='px-4 py-2 bg-red-800 rounded text-white'>Cancel</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default EditProductForm