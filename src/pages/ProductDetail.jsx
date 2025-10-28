import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Loader from "../components/Loader";
import { fetchProductById } from "../redux/productsSlice";
import useCart from "../hooks/useCart";
import formatCurrency from "../utils/formatCurrency";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((s) => s.products.details[id]);
  const status = useSelector((s) => s.products.status);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  // Fetch product by ID if not already in Redux
  useEffect(() => {
    if (!product) dispatch(fetchProductById(id));
  }, [id]);

  if (!product || status === "loading") return <Loader />;

  // Add item to cart 
  const addToCart = () => {
    add({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty,
    });

    toast.success(`${product.title} added to cart`, {
      description: `Quantity: ${qty}`,
      duration: 2500,
    });

    navigate("/cart");
  };

  // Increase quantity with limit check
  const handleIncrease = () => {
    if (qty >= 5) {
      toast.warning("You can only add up to 5 items per order.");
      return;
    }
    setQty(qty + 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
        {/* LEFT: Product Image */}
        <div className="bg-gray-50 rounded-2xl p-10 flex items-center justify-center h-[400px]">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* RIGHT: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-yellow-500 text-xl">★</span>
                <span className="text-lg font-semibold text-gray-800">
                  {product.rating.rate}
                </span>
                <span className="text-sm text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-4xl font-bold text-[#F67B6D]">
                {formatCurrency(product.price)}
              </p>
            </div>
          </div>

          {/* Quantity & Buttons */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {qty}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Maximum 5 items per order
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={addToCart}
                className="w-full py-3 bg-[#F67B6D] text-white text-lg font-semibold rounded-xl hover:bg-[#e75c4e] transition"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate(-1)}
                className="w-full py-3 border border-gray-300 rounded-xl text-gray-700 text-lg hover:bg-gray-100 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

