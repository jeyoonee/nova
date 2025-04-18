import { onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { getLocalCart } from "../services/cartService";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { showSuccess, showError } from "../utils/toastConfig";

export default function Cart() {
  const { user } = useUser();

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const isSameItem = (a, b) =>
    a.productId === b.productId && a.option === b.option;

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
    } else {
      const localCart = getLocalCart();
      const updatedCart = localCart.filter(
        (item) => !isSameItem(item, productToDelete)
      );
      saveToLocalStorage(updatedCart);
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
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const unsubscribe = onSnapshot(
          doc(db, "carts", user.uid),
          (docSnap) => {
            setCartItems(docSnap.exists() ? docSnap.data().items || [] : []);
            setIsLoading(false);
          }
        );
        return () => unsubscribe(); // cleanups
      } else {
        const localItems = getLocalCart();
        setCartItems(localItems);
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  useEffect(() => {
    if (cartItems) {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [cartItems]);

  if (isLoading) return <p>로딩 중입니다...</p>;

  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-[100px]">
      {cartItems.length > 0
        ? cartItems.map((item) => (
            <CartItem
              key={item.productId + item.option}
              product={item}
              handleDelete={() => onDelete(item)}
              handleQuantity={onUpdateQuantity}
            />
          ))
        : "엄서용"}

      {/* 하단 고정 총액 표시 */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-[0.025rem] px-6 py-4 flex justify-between items-center z-50 shadow-md text-[11px] font-light max-w-full overflow-x-auto sm:px-8">
        <span>
          TOTAL
          <span className="ml-8">
            ${" "}
            {totalPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </span>
        <button className="bg-black text-white text-center  rounded-0 hover:bg-[#333333] cursor-pointer transition h-10 w-[168px]">
          BUY
        </button>
      </div>
    </div>
  );
}
