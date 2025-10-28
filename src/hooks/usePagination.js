import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/productsSlice";

export default function usePagination() {
  const dispatch = useDispatch();
  const page = useSelector((s) => s.products.page);
  const set = (p) => dispatch(setPage(p));
  return { page, set };
}
