import { collection, getDocs } from "firebase/firestore";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { useCart } from "../context/CartContext";
import OptionDropdown from "../components/OptionDropdown";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetail() {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const { id } = useParams();
  const { addToCart } = useCart();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const doc = snapshot.docs.find((doc) => doc.id === id);
      const item = doc ? { id: doc.id, ...doc.data() } : null;
      return item;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showOptions &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  const handleSelect = (selectedOption) => {
    addToCart({
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
      option: selectedOption,
    });
    setShowOptions(false);
  };

  const handleClickAdd = () => {
    if (product?.options && product.options.length === 1) {
      addToCart({
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1,
        option: product.options[0],
      });
    } else {
      setShowOptions(true);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>상품 정보를 찾을 수 없습니다.</p>;
  if (error) {
    return <p className="text-red-500">Something went wrong 😖</p>;
  }

  return (
    <section className="flex flex-col lg:flex-row px-12 w-full max-w-screen-xl m-auto gap-12 py-8">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="basis-[55%] aspect-[2/3] w-full object-cover"
      />

      <div className="basis-[45%] flex flex-col text-[#000000] pt-12 pr-5 gap-[2rem] font-light">
        <div className="border-b-[0.03125rem] pb-[2rem] text-[18px]">
          <h1>{product.name}</h1>
          <span className="mb-4">$ {product.price.toFixed(2)}</span>
        </div>

        <div className="relative w-full" ref={dropdownRef}>
          {!showOptions ? (
            <button
              className="w-full h-10 border text-[11px] cursor-pointer"
              onClick={handleClickAdd}
            >
              ADD
            </button>
          ) : (
            <OptionDropdown
              options={product.options ?? []}
              onSelect={handleSelect}
            />
          )}
        </div>

        <p className="text-[13px] my-[2rem]">{product.description}</p>

        <div className="text-[10px] flex flex-col">
          <span className="mb-3 cursor-pointer">PRODUCT MEASUREMENTS</span>
          <span className="mb-3 cursor-pointer">
            COMPOSITION, CARE & ORIGIN
          </span>
          <span className="mb-3 cursor-pointer">
            CHECK IN-STORE AVAILABILITY
          </span>
          <span className=" cursor-pointer">
            SHIPPING, EXCHANGES AND RETURNS
          </span>
        </div>
      </div>
    </section>
  );
}
