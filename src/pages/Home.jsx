import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import useProducts from "../hooks/useProducts";
import { setPage } from "../redux/productsSlice";
import CategoryFilter from "../components/CategoryDropdown";
import { ProductSkeleton } from "../components/ProductSkeleton";

export default function Home() {
  const dispatch = useDispatch();
  const { list, categories, status, error } = useProducts();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");

  const perPage = useSelector((s) => s.products.perPage);
  const currentPage = useSelector((s) => s.products.page);

  // Filtering logic
  const filtered = useMemo(() => {
    let items = list;
    if (search)
      items = items.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    if (cat) items = items.filter((p) => p.category === cat);
    return items;
  }, [list, search, cat]);

  const start = (currentPage - 1) * perPage;
  const paginatedFiltered = filtered.slice(start, start + perPage);
  const totalFilteredPages = Math.max(1, Math.ceil(filtered.length / perPage));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-16 md:mb-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-foreground text-balance">
          Discover <span className="text-[#F67B6D]">Beautiful</span> Products
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
          Thoughtfully curated collection of quality items for your everyday
          life
        </p>
      </div>

      {/* Search + Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-2/3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search for products..."
          />
        </div>
        <div className="w-full md:w-1/3">
          <CategoryFilter
            categories={categories}
            selectedCategory={cat}
            onChange={setCat}
          />
        </div>
      </div>

      {/* Product Grid + States */}
      {status === "loading" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {status === "failed" && (
        <div className="text-[#F67B6D] text-center py-10">
          Error loading products: {error}
        </div>
      )}

      {status === "succeeded" && (
        <>
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No products found for your search or filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedFiltered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <Pagination
              page={currentPage}
              totalPages={totalFilteredPages}
              onChange={(p) => dispatch(setPage(p))}
            />
          )}
        </>
      )}
    </div>
  );
}
