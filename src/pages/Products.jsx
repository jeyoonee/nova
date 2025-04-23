import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Something went wrong 😖</p>;

  return (
    <div className="px-4 md:px-[112px]">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 p-0">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
}
