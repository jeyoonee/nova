import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../utils/firebaseConfig";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [option, setOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const doc = snapshot.docs.find((doc) => doc.id === id);
        const item = doc ? { id: doc.id, ...doc.data() } : null;
        setProduct(item);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.options?.length > 0) {
      setOption(product.options[0]);
    }
  }, [product]);

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>상품 정보를 찾을 수 없습니다.</p>;

  return (
    <section className="flex flex-col lg:flex-row px-12 w-full max-w-screen-xl m-auto gap-12 py-8">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="basis-1/3 aspect-[2/3] w-full object-cover"
      />

      <div className="flex flex-col text-[#000000] ml-[58px] w-full pt-12 pr-5 basis-2/3 gap-[2rem] font-light">
        <div className="border-b-[0.03125rem] pb-[2rem]">
          <h1 className=" text-[18px]">{product.name}</h1>
          <span className="mb-4 text-[16px]">$ {product.price.toFixed(2)}</span>
        </div>

        {product?.options?.length > 1 ? (
          <select
            name="options"
            onChange={handleChange}
            value={option ? option : ""}
          >
            {product.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <div></div>
        )}

        <button
          className="w-full h-10 border text-[11px] cursor-pointer"
          onClick={() =>
            addToCart({
              productId: product.id,
              name: product.name,
              imageUrl: product.imageUrl,
              price: product.price,
              quantity: 1,
              option: option ?? product.options?.[0],
            })
          }
        >
          ADD
        </button>

        <p className="text-xs">{product.description}</p>

        <div className="text-[10px]">
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
