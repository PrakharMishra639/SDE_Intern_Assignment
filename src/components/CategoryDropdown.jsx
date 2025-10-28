import React from "react";

export default function CategoryFilter({
  categories = [],
  selectedCategory,
  onChange,
}) {
  return (
    <div className="w-full">
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm md:text-base
                   focus:outline-none focus:ring-2 focus:ring-[#F67B6D] focus:border-[#F67B6D]
                   transition-all duration-300 shadow-sm"
      >
        <option className="text-gray-500" value="">
          All Categories
        </option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))
        ) : (
          <option disabled>Loading...</option>
        )}
      </select>
    </div>
  );
}
