import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, provider);

export const logout = () => {
  const uid = auth.currentUser?.uid;
  if (uid) {
    localStorage.removeItem(`admin:${uid}`);
  }
  return signOut(auth);
};

export const subscribeToAuth = (callback) => onAuthStateChanged(auth, callback);

// ✅ 관리자 여부 확인 함수
export const getUserRole = async (uid) => {
  const cached = localStorage.getItem(`admin:${uid}`);
  if (cached !== null) {
    return cached === "true";
  }

  const snap = await getDoc(doc(db, "users", uid));
  const isAdmin = snap.exists() ? snap.data().isAdmin === true : false;

  localStorage.setItem(`admin:${uid}`, isAdmin.toString());
  console.log("로스", localStorage.getItem(`admin:${uid}`));

  return isAdmin;
};
