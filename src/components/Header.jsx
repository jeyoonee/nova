import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import {
  loginWithGoogle,
  logout,
  subscribeToAuth,
} from "../services/authService";
import { getLocalCart } from "../services/cartService";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

export default function Header() {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        const localItems = getLocalCart();
        setCartItems(localItems);
        setIsLoading(false);
      } else {
        const unsubscribe = onSnapshot(
          doc(db, "carts", user.uid),
          (docSnap) => {
            if (docSnap.exists()) {
              const items = docSnap.data().items || [];

              setCartItems([...items, ...cartItems]);
            } else {
              setCartItems([...cartItems]);
            }

            setIsLoading(false);
          }
        );

        return () => unsubscribe(); // cleanups
      }
    };

    fetchCart();
  }, [user]);

  const handleAuthClick = () => {
    if (user) {
      logout().catch(console.error);
    } else {
      loginWithGoogle().catch(console.error);
    }
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
          <Link to="cart" className="cursor-pointer">
            SHOPPING BAG [
            {cartItems && cartItems.length > 0 ? cartItems.length : 0}]
          </Link>
        </div>
      )}
    </header>
  );
}
