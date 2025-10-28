import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../redux/productsSlice";

export default function useProducts() {
  const dispatch = useDispatch();
  const { list, categories, status, error, page, perPage } = useSelector(
    (s) => s.products
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
    if (!categories || categories.length === 0) dispatch(fetchCategories());
  }, [dispatch]);

  const start = (page - 1) * perPage;
  const paginated = list.slice(start, start + perPage);
  const totalPages = Math.ceil(list.length / perPage || 1);

  return {
    list,
    categories,
    status,
    error,
    page,
    perPage,
    paginated,
    totalPages,
  };
}
