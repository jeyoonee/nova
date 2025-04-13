import { Link } from "react-router-dom";
import {
  loginWithGoogle,
  logout,
  subscribeToAuth,
} from "../services/authService";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { user } = useUser();

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
        <img src="logo.png" alt="nova logo" className="w-[262px] h-[109px]" />
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

        {user ? (
          <Link to="cart" className="cursor-pointer">
            SHOPPING BAG [0]
          </Link>
        ) : (
          <span onClick={handleAuthClick} className="cursor-pointer">
            SHOPPING BAG [0]
          </span>
        )}
      </div>
    </header>
  );
}
