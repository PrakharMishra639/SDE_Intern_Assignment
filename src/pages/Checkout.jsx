import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useCart from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";

export default function Checkout() {
  const { cart, clear } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  // Basic validation
  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";

    const email = form.email.trim();
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      email.startsWith("@") ||
      email.endsWith("@") ||
      email.startsWith(".") ||
      email.endsWith(".") ||
      email.split("@").length !== 2
    ) {
      e.email = "Enter a valid email address";
    }

    if (form.address.trim().length < 8) e.address = "Full address required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  
  const placeOrder = async () => {
    if (!validate()) {
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }

    if (cart.items.length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    try {
      setLoading(true); 
      toast.info("Processing your order...");

      await new Promise((res) => setTimeout(res, 2000));

      const total = cart.total;
      toast.success("Order placed successfully!", {
        description: "Redirecting to confirmation page...",
        duration: 2000,
      });

      clear();
      navigate("/confirmation", { state: { name: form.name, total } });
    } catch (err) {
      toast.error("Something went wrong while placing your order.");
      console.error("Checkout error:", err);
    } finally {
      setLoading(false); 
    }
  };

  
  if (cart.items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-light text-gray-700 mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg bg-[#F67B6D] hover:bg-[#e96a5d] text-white font-medium transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl font-light text-[#333444] mb-10">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Checkout Form */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-medium text-[#333444] mb-6">
            Shipping Details
          </h2>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F67B6D] outline-none transition"
                placeholder="John Doe"
                disabled={loading} //  disable during loading
              />
              {errors.name && (
                <p className="text-rose-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F67B6D] outline-none transition"
                placeholder="example@email.com"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-rose-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F67B6D] outline-none transition"
                rows={4}
                placeholder="Street, City, ZIP Code"
                disabled={loading}
              />
              {errors.address && (
                <p className="text-rose-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading} // Disable button while loading
            className={`w-full mt-8 px-6 py-3 rounded-lg text-white font-medium transition text-lg shadow-sm ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#F67B6D] hover:bg-[#e96a5d]"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"} 
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-[#FFF7F5] border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-medium text-[#333444] mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-80 overflow-y-auto">
            {cart.items.map((it) => (
              <div
                key={it.id}
                className="flex justify-between items-start border-b border-gray-200 pb-3"
              >
                <div className="text-sm text-gray-700 w-2/3">
                  <p className="font-medium truncate">{it.title}</p>
                  <p className="text-gray-500">Qty: {it.qty}</p>
                </div>
                <div className="text-right text-sm font-semibold text-gray-800">
                  {formatCurrency(it.price * it.qty)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-300 mt-6 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(cart.total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-gray-300 pt-3 flex justify-between text-base font-semibold text-[#333444]">
              <span>Total</span>
              <span className="text-[#F67B6D]">
                {formatCurrency(cart.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
