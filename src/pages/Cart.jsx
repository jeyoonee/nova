import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getLocalCart } from "../services/cartService";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Cart() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <p>로딩 중입니다...</p>;

  return (
    <ul>
      {cartItems.length > 0
        ? cartItems.map((item) => <li key={item.productId}>{item.name}</li>)
        : "엄서용"}
    </ul>
  );
}
