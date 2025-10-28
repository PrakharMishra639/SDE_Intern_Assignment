import React from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-800 ">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-light tracking-tight text-[#F67B6D]">
              Nua
            </h3>
            <p className="text-slate-500 font-light leading-relaxed">
              Thoughtfully curated products for your everyday life. Experience
              the beauty of simplicity.
            </p>
            <div className="flex gap-4 pt-4">
              <Heart className="w-5 h-5 text-[#F67B6D]/70 hover:text-[#F67B6D] transition-colors cursor-pointer" />
              <Mail className="w-5 h-5 text-[#F67B6D]/70 hover:text-[#F67B6D] transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="font-light text-slate-800 tracking-wide">Shop</h4>
            <ul className="space-y-3">
              {["All Products", "New Arrivals", "Best Sellers", "Sale"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-slate-500 hover:text-[#F67B6D]/80 font-light transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-light text-slate-800 tracking-wide">Support</h4>
            <ul className="space-y-3">
              {["Contact Us", "Shipping Info", "Returns", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    to="/"
                    className="text-slate-500 hover:text-[#F67B6D]/80 font-light transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-light text-slate-800 tracking-wide">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-[#F67B6D]/60 mt-0.5 shrink-0" />
                <span className="text-slate-500 font-light">
                  +91 (555) 123-4567
                </span>
              </div>
              <div className="flex gap-3 items-start">
                <Mail className="w-5 h-5 text-[#F67B6D]/60 mt-0.5 shrink-0" />
                <span className="text-slate-500 font-light">hello@nua.com</span>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#F67B6D]/60 mt-0.5 shrink-0" />
                <span className="text-slate-500 font-light">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#F67B6D]/10 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 font-light text-sm">
            © {currentYear}{" "}
            <span className="text-[#F67B6D] font-medium">Nua</span>. All rights
            reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  to="/"
                  className="text-slate-500 hover:text-[#F67B6D] font-light text-sm transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
