import { Link } from "react-router-dom";
import { loginWithGoogle, logout } from "../services/authService";
import { useUser } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import { LiaShoppingBagSolid } from "react-icons/lia";

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
    <header className="flex flex-col lg:flex-row w-full items-center lg:justify-between lg:h-[245px] px-12 py-5">
      {/* 상단 우측 영역 (LOG IN/OUT + 장바구니) - 작은화면 전용 */}
      <div className="w-full flex justify-end items-center gap-4 mb-4 lg:hidden text-[0.6875rem] font-light tracking-[0.05rem]">
        <span className="cursor-pointer" onClick={handleAuthClick}>
          {user ? "LOG OUT" : "LOG IN"}
        </span>
        <Link to="/cart" className="relative cursor-pointer">
          <LiaShoppingBagSolid className="text-lg" />
        </Link>
      </div>

      {/* 로고 */}
      <div className="w-full lg:w-auto flex justify-center lg:justify-start">
        <Link to="/">
          <img
            src="/logo.png"
            alt="nova logo"
            className="w-[262px] h-[109px]"
          />
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-6 text-[0.6875rem] font-light tracking-[0.05rem]">
        <Link to="products" className="cursor-pointer">
          PRODUCTS
        </Link>
        {user?.isAdmin && (
          <Link to="edit" className="cursor-pointer">
            EDIT
          </Link>
        )}
        <span className="cursor-pointer" onClick={handleAuthClick}>
          {user ? "LOG OUT" : "LOG IN"}
        </span>
        <Link to="cart" className="cursor-pointer">
          SHOPPING BAG [{cart?.length ?? 0}]
        </Link>
      </div>
    </header>
  );
}
