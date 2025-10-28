import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F67B6D] flex items-center justify-center text-white font-semibold shadow-sm">
            N
          </div>
          <div>
            <div className="text-xl md:text-xl font-medium text-[#F67B6D] tracking-tight">
              Nua
            </div>
          </div>
        </Link>

        {/*  Right Section (Shop + Cart) */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-light text-slate-700 hover:text-[#F67B6D] transition-colors duration-300 uppercase tracking-wide"
          >
            Shop
          </Link>

          <button
            onClick={() => navigate("/cart")}
            className="relative inline-flex items-center p-2 rounded-full hover:bg-slate-100 transition-all"
          >
            <FiShoppingCart size={20} className="text-slate-800" />
            {cart.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F67B6D] text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                {cart.items.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
