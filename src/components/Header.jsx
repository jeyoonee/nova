import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import {
  loginWithGoogle,
  logout,
  subscribeToAuth,
} from "../services/authService";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

export default function Header() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const snapshot = await getDocs(collection(db, "carts"));
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items[0].items);
      } catch (error) {
        console.error("장바구니 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleAuthClick = () => {
    if (user) {
      logout().catch(console.error);
    } else {
      loginWithGoogle().catch(console.error);
    }
  };

  const getLocalCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };

  return (
    <header className="flex w-full justify-between h-[245px] px-[48px] py-[20px]">
      <Link to="/">
        <img src="/logo.png" alt="nova logo" className="w-[262px] h-[109px]" />
      </Link>
      {isLoading ? (
        <p className="text-[0.6875rem] font-light tracking-[0.05rem]">
          Loading...
        </p>
      ) : (
        <div className="text-[0.6875rem] font-light tracking-[0.05rem]">
          <Link to="products" className="mr-6 cursor-pointer">
            PRODUCTS
          </Link>

          {user?.isAdmin && (
            <Link to="edit" className="mr-6 cursor-pointer">
              EDIT
            </Link>
          )}

          <span className="mr-6 cursor-pointer" onClick={handleAuthClick}>
            {user ? "LOG OUT" : "LOG IN"}
          </span>

          {user ? (
            <Link to="cart" className="cursor-pointer">
              SHOPPING BAG [
              {cartItems && cartItems.length > 0 ? cartItems.length : 0}]
            </Link>
          ) : (
            <span onClick={handleAuthClick} className="cursor-pointer">
              SHOPPING BAG [0]
            </span>
          )}
        </div>
      )}
    </header>
  );
}
