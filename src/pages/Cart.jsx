import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";
import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import formatCurrency from "../utils/formatCurrency";

export default function Cart() {
  const { cart, setQty, remove, clear } = useCart();
  const navigate = useNavigate();

  //  Handle clearing the entire cart
  const handleClearCart = () => {
    if (cart.items.length === 0) return;
    clear();
    toast.success("Cart cleared successfully!", {
      description: "All items have been removed from your cart.",
    });
  };

  //  Handle removing a single item
  const handleRemoveItem = (id) => {
    remove(id);
    toast.info("Item removed from cart.", {
      duration: 2000,
    });
  };

  // Navigate to checkout
  const handleCheckout = () => {
    toast.success("Redirecting to checkout...", {
      duration: 1500,
    });
    setTimeout(() => navigate("/checkout"), 1000);
  };

  //  Empty cart state
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-10 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h2 className="text-4xl font-light mb-6 text-gray-800">
            Shopping <span className="text-[#F67B6D]">Cart</span>
          </h2>
          <p className="text-gray-500 text-lg mb-8 font-light">
            Your cart is empty.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-[#F67B6D] text-white rounded-xl hover:bg-[#e45d4e] transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F0EF]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#F67B6D] hover:text-[#e45d4e] transition-colors duration-300 mb-8 font-light"
        >
          <FiArrowLeft size={20} />
          Back to Shopping
        </button>

        {/*  Heading */}
        <h1 className="text-5xl md:text-6xl font-light mb-12 text-gray-900">
          Shopping <span className="text-[#F67B6D]">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((it) => (
                <CartItem
                  key={it.id}
                  item={it}
                  onQtyChange={(id, q) => setQty(id, q)}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 sticky top-24 shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-light text-gray-900 mb-8">
                Order Summary
              </h2>

              {/* Subtotal, Shipping, Tax */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 font-light">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cart.total)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-light">
                  <span>Shipping</span>
                  <span className="text-[#F67B6D] font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 font-light">
                  <span>Tax</span>
                  <span>{formatCurrency(cart.total * 0.1)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-6 mb-8">
                <div className="flex justify-between text-xl font-light text-gray-900">
                  <span>Total</span>
                  <span className="text-[#F67B6D] font-semibold">
                    {formatCurrency(cart.total * 1.1)}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 text-base font-medium bg-[#F67B6D] hover:bg-[#e45d4e] text-white rounded-xl mb-3 transition-all duration-300"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleClearCart}
                className="w-full py-4 font-light border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-300 bg-transparent text-gray-700"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
