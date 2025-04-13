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
        console.log(1, isAdmin);
        setUser({ ...firebaseUser, isAdmin });
      } else {
        setUser(null);
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
