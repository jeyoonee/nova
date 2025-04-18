import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { mergeCartsOnLogin } from "./services/cartService";
import { useEffect } from "react";
import { useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isCart = location.pathname === "/cart";

  useEffect(() => {
    if (user) {
      mergeCartsOnLogin(user.uid);
    }
  }, [user]);

  return (
    <>
      <Header />
      <Outlet />
      {!isHome && !isCart && <Footer />}
    </>
  );
}

export default App;
