import { ShoppingCart } from "lucide-react";
import { CartApi } from "../api/cartApi.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CartItems from "../components/CartItems.jsx";
import OrderSummary from "../components/OrderSummary.jsx";

const CartPage = () => {
  const { cart } = CartApi();

  return (
    <div className='py-32 bg-gray-800 min-h-screen'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight'>
          Your Shopping Cart
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {/* Cart Items Section */}
          <motion.div
            className='col-span-2 space-y-6'
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              cart.map((item) => <CartItems key={item._id} item={item} />)
            )}
          </motion.div>

          {/* Order Summary Section */}
          {cart.length > 0 && (
            <motion.div
              className='bg-white shadow-lg rounded-2xl p-6 sticky top-24 h-fit'
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
                Order Summary
              </h2>
              <OrderSummary />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

// ----------------- Empty Cart UI -----------------
const EmptyCartUI = () => (
  <motion.div
    className='flex flex-col items-center justify-center text-center bg-white p-12 rounded-2xl shadow-lg'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className='w-20 h-20 text-gray-300 mb-4' />
    <h3 className='text-2xl font-bold text-gray-700'>Your cart is empty</h3>
    <p className='text-gray-500 mt-2 mb-6'>
      Looks like you haven’t added anything yet.
    </p>
    <Link
      to='/'
      className='px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition shadow-md'
    >
      Start Shopping
    </Link>
  </motion.div>
);
