import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useProductApi } from "../api/productApi";
import EditProductForm from "./EditProductForm.jsx";

function ProductsCardTwo({ product }) {
  const { DeleteTheProducts } = useProductApi();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing && (
        <EditProductForm
          product={product}
          onClose={() => setIsEditing(false)}
        />
      )}

      <div className="group relative flex flex-col w-full h-full overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-md transition hover:shadow-xl">
        {/* Image */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={product.image}
            alt="product"
            className="w-full h-full object-cover"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 z-0 transition-opacity" />

          {/* Action buttons on hover */}
          <div className="absolute inset-0 z-10 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              title="Edit"
              className="w-1/2 h-full flex justify-center items-center hover:bg-cyan-700/40"
            >
              <Edit className="w-6 h-6 text-cyan-300" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => DeleteTheProducts(product._id)}
              title="Delete"
              className="w-1/2 h-full flex justify-center items-center hover:bg-red-700/40"
            >
              <Trash2 className="w-6 h-6 text-red-400" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col gap-2 text-white">
          <h5 className="text-base font-semibold truncate">{product.name}</h5>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-cyan-400">₱{product.price}</span>
            <span className="text-gray-400">Qty: {product.quantity}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsCardTwo;
