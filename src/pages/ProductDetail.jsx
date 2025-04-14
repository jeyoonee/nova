import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";

export default function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

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
    </>
  );
}
