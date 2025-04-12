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
export const logout = () => signOut(auth);
export const subscribeToAuth = (callback) => onAuthStateChanged(auth, callback);

// ✅ 관리자 여부 확인 함수
export const getUserRole = async (uid) => {
  try {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data().isAdmin === true : false;
  } catch (err) {
    console.error("관리자 확인 에러", err);
    return false;
  }
};
