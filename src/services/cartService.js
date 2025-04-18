import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

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

export const getLocalCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const clearLocalCart = () => {
  localStorage.removeItem("cart");
};

export const mergeCartsOnLogin = async (uid) => {
  // 1. 로컬 카트 가져오기
  const localCart = getLocalCart();

  // 2. 파이어스토어 카트 가져오기
  const cartDocRef = doc(db, "carts", uid);
  const snap = await getDoc(cartDocRef);
  const firestoreCart = snap.exists() ? snap.data().items || [] : [];

  // 3. 두 카트를 productId 기준으로 머지
  const merged = [...firestoreCart];

  localCart.forEach((localItem) => {
    const idx = merged.findIndex(
      (item) =>
        item.productId === localItem.productId &&
        item.option === localItem.option
    );
    if (idx >= 0) {
      // 이미 파이어스토어에 있으면 수량만 합치기
      merged[idx].quantity += localItem.quantity;
    } else {
      // 없으면 추가
      merged.push(localItem);
    }
  });
  // 4. 파이어스토어에 저장
  await setDoc(cartDocRef, { items: merged });

  // 5. 로컬 카트 비우기
  clearLocalCart();
};
