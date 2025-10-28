import React from "react";
import { Link } from "react-router-dom";
import formatCurrency from "../utils/formatCurrency";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-[0_4px_20px_rgba(246,123,109,0.15)] transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative h-60 bg-linear-to-br from-[#FFF7F6] via-white to-[#FFECE9] flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full p-8 object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col grow">
        <h3 className="font-light text-gray-800 line-clamp-2 mb-4 text-md tracking-wide group-hover:text-[#F67B6D] transition-colors duration-300">
          {product.title}
        </h3>

        {/* Price and Rating / Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-lg font-medium text-[#F67B6D]">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#FFF7F6] px-3 py-1 rounded-full">
            <span className="text-[#F67B6D]">★</span>
            <span className="font-medium">
              {product?.rating?.rate || "4.5"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
