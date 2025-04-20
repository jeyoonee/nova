import { IoTrashBin } from "react-icons/io5";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export default function CartItem({ product, handleDelete, handleQuantity }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col cursor-pointer font-light text-[11px] w-full"
      onClick={() => navigate(`/products/${product.productId}`)}
    >
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
            <HiMinus />
          </button>
          <input
            type="text"
            aria-disabled
            className="w-4 text-center bg-transparent outline-nonetext-black border-none"
            value={product.quantity}
            onChange={() => {}}
          />
          <button
            className="cursor-pointer text-[12px]"
            onClick={() => handleQuantity(product, "+")}
          >
            <HiPlus />
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
