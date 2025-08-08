import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useProductApi } from "../api/productApi.js";
import ProductsCardTwo from "./ProductsCardTwo.jsx";

const ProductLists = () => {
  const { GetProductsByUserId, products, loading } = useProductApi();
  const { userId: paramUserId } = useParams();

  const userId = paramUserId || localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      GetProductsByUserId(userId);
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-indigo-400 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Products by Seller
        </motion.h1>

        {loading && (
          <p className="text-center text-gray-400 text-lg">Loading products...</p>
        )}

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {!loading && products?.length === 0 && (
            <h2 className="text-xl sm:text-2xl text-gray-400 text-center col-span-full">
              No products found
            </h2>
          )}

          {!loading &&
            products?.map((product) => (
              <div
                key={product._id}
                className="w-full aspect-square bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <ProductsCardTwo product={product} />
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductLists;
