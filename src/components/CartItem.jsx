import { IoTrashBin } from "react-icons/io5";
import { useUser } from "../context/UserContext";

export default function CartItem({ product, handleDelete, handleQuantity }) {
  const { user } = useUser();

  return (
    <div className="flex flex-col cursor-pointer font-light text-[11px] w-full">
      <div className="w-full">
        <img src={product.imageUrl} alt={product.name} className="w-full" />
      </div>
      <div className="py-3 leading-[1.25rem]">
        <div className="flex w-full justify-between ">
          <span>{product.name}</span>
          <span className="mr-2">{product.option}</span>
        </div>
        <p className="mb-5">$ {product.price.toFixed(2)}</p>
        <div className="flex items-center space-x-4">
          <button
            className=" text-[12px] cursor-pointer"
            onClick={() => handleQuantity(product, "-")}
          >
            -
          </button>
          <input
            type="text"
            aria-disabled
            className="w-4 text-center bg-transparent outline-nonetext-black border-none"
            value={product.quantity}
          />
          <button
            className="cursor-pointer text-[12px]"
            onClick={() => handleQuantity(product, "+")}
          >
            +
          </button>
          <span
            className="cursor-pointer"
            onClick={() => handleDelete(product)}
          >
            <IoTrashBin />
          </span>
        </div>
      </div>
    </div>
  );
}
