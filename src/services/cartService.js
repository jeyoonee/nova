import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const saveToFirestore = async (uid, product) => {
  const cartRef = doc(db, "carts", uid);
  const cartSnap = await getDoc(cartRef);

  let items = [];

  if (cartSnap.exists()) {
    items = cartSnap.data().items || [];
  }

  // 이미 같은 상품+옵션이 담겨있다면 수량만 증가
  const index = items.findIndex(
    (item) =>
      item.productId === product.productId && item.option === product.option
  );

  if (index >= 0) {
    items[index].quantity += product.quantity;
  } else {
    items.push(product);
  }

  await setDoc(cartRef, {
    userId: uid,
    items,
  });
};

export const saveToLocalStorage = (product) => {
  const stored = JSON.parse(localStorage.getItem("cart")) || [];

  const index = stored.findIndex(
    (item) =>
      item.productId === product.productId && item.option === product.option
  );

  if (index >= 0) {
    stored[index].quantity += product.quantity;
  } else {
    stored.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(stored));
};
