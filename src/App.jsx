import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { mergeCartsOnLogin } from "./services/cartService";
import { useEffect } from "react";
import { useUser } from "./context/userContext";

function App() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      mergeCartsOnLogin(user.uid);
    }
  }, [user]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
