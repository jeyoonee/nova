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
    <>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover mb-2"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-2 ">$ {product.price.toLocaleString()}</p>

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

      <button onClick={() => addToCart(cartItem)}>ADD</button>
    </>
  );
}
