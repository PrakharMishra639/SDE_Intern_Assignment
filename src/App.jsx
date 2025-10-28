import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/*  Header  */}
      <Header />
      <Toaster richColors position="top-center" />
      {/* Main content */}
      <main className="flex-1 py-6 bg-[#F3F0EF]">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </Suspense>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
