import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { CartApi } from '../api/cartApi.js';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authUser } from '../api/authApi.js';
import { OrderApi } from '../api/orderApi.js';

function OrderSummary() {
    const { cart, total, subTotal} = CartApi();
	const { user } = authUser();
	const { CheckOut } = OrderApi();

	const handleCheckout = async () => {
  const products = cart.map(item => ({
    productId: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  try {
    await CheckOut({
      userId: user.userId,
      products,
    });

    toast.success("Order placed successfully");
  } catch (error) {
    console.error("CheckOut error", error);
    toast.error("Checkout failed");
  }
};

    const savings = subTotal - total;
    const formattedSubtotal = subTotal.toFixed(2);
    const formattedTotal =  total.toFixed(2);

  return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
					</dl>

					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'>${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button onClick={handleCheckout}
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
}

export default OrderSummary