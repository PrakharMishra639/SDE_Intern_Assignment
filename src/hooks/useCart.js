import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQty,
  removeFromCart,
  clearCart,
} from "../redux/cartSlice";

export default function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.cart);

  const add = (payload) => dispatch(addToCart(payload));
  const setQty = (id, qty) => dispatch(updateQty({ id, qty }));
  const remove = (id) => dispatch(removeFromCart(id));
  const clear = () => dispatch(clearCart());

  return { cart, add, setQty, remove, clear };
}
