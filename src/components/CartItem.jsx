import { HiMinus, HiPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";

export default function CartItem({ product, handleDelete, handleQuantity }) {
  const navigate = useNavigate();

  return (
    <div
      className="relative group flex flex-col sm:flex-row
     font-light text-[11px] w-full"
    >
      {/* 삭제 버튼 */}
      <button
        onClick={() => handleDelete(product)}
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer hidden md:inline"
      >
        <TfiClose className="text-[12px]" />
      </button>

      {/* 이미지 + 내용 (모바일에서는 가로 배치) */}
      <div className="flex sm:flex-row gap-3 md:gap-0 md:flex-col lg:flex-col xl:flex-col 2xl:flex-col cursor-pointer">
        <div
          className="w-full basis-1/2 md:basis-auto aspect-[2/3] md:aspect-auto"
          onClick={() => navigate(`/products/${product.productId}`)}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover max-h-400px"
          />
        </div>
        <div className="ml-3 mt-2 spy-3 leading-[1.25rem] flex flex-col justify-between">
          <div>
            <div className="flex w-full justify-between">
              <span>{product.name}</span>
              <span className="mr-2">{product.option}</span>
            </div>
            <p className="mb-5 mr-2">$ {product.price.toFixed(2)}</p>
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
            </div>
          </div>

          {/* 작은 화면에서는 텍스트로 DELETE 표시 */}
          <button
            className="sm:hidden text-left text-[11px] cursor-pointer mt-4"
            onClick={() => handleDelete(product)}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
