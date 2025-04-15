import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { saveToFirestore, saveToLocalStorage } from "../services/cartService";
import { useUser } from "../context/UserContext";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [cartItem, setCartItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useUser();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const doc = snapshot.docs.find((doc) => doc.id === id);
        const item = doc ? { id: doc.id, ...doc.data() } : null;
        setProduct(item);
        setCartItem({
          productId: item.id,
          name: item.name,
          imageUrl: item.imageUrl,
          price: item.price,
          quantity: 1,
          option: item.options?.[0],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async (product) => {
    console.log("카트에 담길 것", product);
    if (user) {
      // 로그인 했을 경우 - firestore에 저장
      saveToFirestore(user.uid, product);
    } else {
      // 비로그인 - localStorage에 저장
      saveToLocalStorage(product);
    }
  };

  const handleChange = (e) => {
    setCartItem((prev) => ({
      ...prev,
      option: e.target.value,
    }));
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

        {product.options.length > 0 ? (
          <select
            name="options"
            onChange={handleChange}
            value={cartItem?.option || ""}
          >
            {product.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <></>
        )}

        <button
          className="w-full h-10 border-[0.03125rem] text-[11px] cursor-pointer"
          onClick={() => addToCart(cartItem)}
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
