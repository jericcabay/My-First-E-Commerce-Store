import React, { useEffect } from 'react';
import { OrderApi } from '../api/orderApi.js';

function Orders() {
  const { orders, FetchOrder } = OrderApi();

  useEffect(() => {
    FetchOrder();
  }, []);

  return (
    <div className='flex flex-col lg:flex-row justify-between gap-6 p-6  min-h-screen'>
      {/* Orders Section */}
      <div className='w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-lg'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>📦 Orders</h2>
        <div className="overflow-x-auto">
          <table className='min-w-full text-sm text-left text-gray-700'>
            <thead>
              <tr className='bg-gray-200 text-gray-800 uppercase text-xs tracking-wider'>
                <th className='p-3'>ID</th>
                <th className='p-3'>Item</th>
                <th className='p-3'>Qty</th>
                <th className='p-3'>Amount</th>
                <th className='p-3'>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500 italic">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) =>
                  order.products.map((p, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className='p-3'>{order._id.slice(0, 6)}</td>
                      <td className='p-3'>{p.product.name}</td>
                      <td className='p-3'>{p.quantity}</td>
                      <td className='p-3 text-green-600 font-semibold'>₱{p.price * p.quantity}</td>
                      <td className='p-3'>
                        <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                          Processing
                        </span>
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Section */}
      <div className='w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-lg'>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>✅ Completed</h2>
        <div className="text-gray-500 italic">No completed orders yet.</div>
        {/* Future completed orders display goes here */}
      </div>
    </div>
  );
}

export default Orders;
