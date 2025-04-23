import {
  loginWithGoogle,
  logout,
  subscribeToAuth,
  getUserRole,
} from "../services/authService";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = await getUserRole(firebaseUser.uid);
        setUser({ ...firebaseUser, isAdmin });
        localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 업데이트
      } else {
        setUser(null);
        localStorage.removeItem("isLoggedIn"); // 로그아웃 상태 업데이트
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
