import { ShoppingBag } from 'lucide-react';

function CartLoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <ShoppingBag className="w-12 h-12 text-cyan-500 animate-bounce" />
        <p className="text-sm text-gray-600 dark:text-gray-300">Fetching your cart...</p>
      </div>
    </div>
  );
}

export default CartLoadingSpinner;