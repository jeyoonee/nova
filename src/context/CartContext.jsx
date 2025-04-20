import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import {
  clearLocalCart,
  getLocalCart,
  mergeCartsOnLogin,
  saveToLocalStorage,
  saveToFirestore,
} from "../services/cartService";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { showSuccess, showError } from "../utils/toastConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  const isSameItem = (a, b) =>
    a.productId === b.productId && a.option === b.option;

  useEffect(() => {
    if (user) {
      mergeCartsOnLogin(user.uid).then((mergedCart) => setCart(mergedCart));
    } else {
      setCart(getLocalCart());
    }
  }, [user]);

  const addToCart = async (product) => {
    if (user) {
      // 로그인 했을 경우 - firestore에 저장
      await saveToFirestore(user.uid, product);
      const snap = await getDoc(doc(db, "carts", user.uid));
      const newCart = snap.exists() ? snap.data().items || [] : [];
      setCart(newCart);
    } else {
      // 비로그인 - localStorage에 저장
      saveToLocalStorage(product);
      setCart(getLocalCart());
    }

    showSuccess("ADDED TO YOUR BASKET");
  };

  const onDelete = async (productToDelete) => {
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      const prevItems = cartSnap.data().items || [];

      const updatedItems = prevItems.filter(
        (item) => !isSameItem(item, productToDelete)
      );

      await updateDoc(cartRef, {
        items: updatedItems,
      });
      setCart(updatedItems);
      showSuccess();
    } else {
      const localCart = getLocalCart();
      const updatedCart = localCart.filter(
        (item) => !isSameItem(item, productToDelete)
      );
      saveToLocalStorage(updatedCart);
      setCart(updatedCart);
      showSuccess();
    }
  };

  const onUpdateQuantity = async (product, opr) => {
    const newQuantity =
      opr === "+" ? product.quantity + 1 : product.quantity - 1;

    if (newQuantity < 1) return; // 수량은 1 미만 불가

    const updatedProduct = { ...product, quantity: newQuantity };

    if (user) {
      const cartRef = doc(db, "carts", user.uid);

      try {
        // 먼저 기존 cart 불러오기
        const cartSnap = await getDoc(cartRef);
        const prevItems = cartSnap.data().items || [];

        // 수정된 상품만 업데이트해서 새 배열 생성
        const updatedItems = prevItems.map((item) =>
          item.productId === product.productId && item.option === product.option
            ? updatedProduct
            : item
        );

        // 다시 덮어쓰기
        await updateDoc(cartRef, {
          items: updatedItems,
        });
        setCart(updatedItems);
        showSuccess();
      } catch (err) {
        console.error("수량 업데이트 실패", err);
        showError("Failed to change quantity");
      }
    } else {
      const localCart = getLocalCart();
      const updatedCart = localCart.map((item) =>
        isSameItem(item, product) ? updatedProduct : item
      );
      saveToLocalStorage(updatedCart);
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        onDelete,
        onUpdateQuantity,
        clearLocalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
