import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isCart = location.pathname === "/cart";

  return (
    <>
      <Header />
      <Outlet />
      {!isHome && !isCart && <Footer />}
    </>
  );
}

export default App;
