import { Link } from "react-router-dom";
import { loginWithGoogle, logout } from "../services/authService";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user } = useUser();
  const { cart } = useCart();

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
          SHOPPING BAG [{cart?.length ?? 0}]
        </Link>
      </div>
    </header>
  );
}
