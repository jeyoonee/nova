import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, onDelete, onUpdateQuantity } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce(
        (acc, item) => acc + Number(item.price || 0) * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [cart]);

  return (
    <div className="p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-40">
      {cart.length > 0 ? (
        cart.map((item) => (
          <CartItem
            key={item.productId + item.option}
            product={item}
            handleDelete={() => onDelete(item)}
            handleQuantity={onUpdateQuantity}
          />
        ))
      ) : (
        <div className="text-center col-span-full text-gray-400">
          Your cart is empty.
        </div>
      )}

      {/* 하단 고정 총액 표시 */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-[0.025rem] px-6 py-4 flex justify-between items-center z-50 shadow-md text-[12.5px] font-light max-w-full overflow-x-auto sm:px-8">
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
