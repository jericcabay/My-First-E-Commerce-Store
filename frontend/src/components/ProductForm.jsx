import React from 'react'
import { useState } from 'react'
import { useProductApi } from '../api/productApi.js';
import categories from '../tools/categories.js';

function ProductForm() {
  const { createProducts, loading } = useProductApi();
  const [newProducts, setNewProducts] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
    image: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await createProducts(newProducts);
      setNewProducts({name: "", description: "", quantity: "", price: "", category: "", image: "",})
    } catch (error) {
      console.log("error creating a product");
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProducts({ ...newProducts, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'>
        <div className='flex justify-center'>
            <h2 className="text-2xl font-semibold mb-6 text-cyan-300">Register Products</h2>
        </div>

        <div>
          <form onSubmit={handlesubmit} className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-300'>Product Name</label>
              <input type='text' id='name' name='name' value={newProducts.name} onChange={(e) => setNewProducts({ ...newProducts, name: e.target.value })} required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500' />
            </div>

            <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-300'>Product Description</label>
              <textarea id='description' name='description' value={newProducts.description} onChange={(e) => setNewProducts({ ...newProducts, description: e.target.value })} required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'  />
            </div>

            <div>
              <label htmlFor='quantity' className='block text-sm font-medium text-gray-300'>Product Quantity</label>
              <input type='number' id='quantity' name='quantity' value={newProducts.quantity} onChange={(e) => setNewProducts({ ...newProducts, quantity: e.target.value })} required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'  />
            </div>

            <div>
              <label htmlFor='price' className='block text-sm font-medium text-gray-300'>Product Price</label>
              <input type='number' id='price' name='price' value={newProducts.price} onChange={(e) => setNewProducts({ ...newProducts, price: e.target.value })} required
              className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'  />
            </div>

            <div>
              <label htmlFor='category' className='block text-sm font-medium text-gray-300'>Product Category</label>
              <select id='name' name='category' value={newProducts.category} onChange={(e) => setNewProducts({ ...newProducts, category: e.target.value })} required
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
                onChange={handleImageChange}
                accept='image/*'
                required
                className='mt-1 block w-full bg-gray-700 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'/>
            </div>
            
            <button type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50'>Register Product</button>
          </form>
        </div>
    </div>
  )
}

export default ProductForm