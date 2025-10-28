import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import formatCurrency from "../utils/formatCurrency";

export default function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product Image */}
      <div className="w-24 h-24 flex items-center justify-center bg-linear-to-br from-[#FFECEA] to-white rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="max-h-full object-contain p-2"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <select
          value={item.qty}
          onChange={(e) => onQtyChange(item.id, Number(e.target.value))}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:border-[#F67B6D] focus:outline-none focus:ring-2 focus:ring-[#F67B6D]/30 transition"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-1 text-[#F67B6D] text-sm hover:text-[#e5675e] transition"
        >
          <FaTrashAlt size={14} />
          <span>Remove</span>
        </button>

        {/* Total Price */}
        <div className="text-sm font-semibold text-gray-800">
          {formatCurrency(item.price * item.qty)}
        </div>
      </div>
    </div>
  );
}
