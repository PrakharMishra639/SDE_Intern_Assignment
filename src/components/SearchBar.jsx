import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <FaSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
        size={14}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full bg-white pl-9 pr-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F67B6D]/60 shadow-sm text-sm"
      />
    </div>
  );
}
