import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isCart = location.pathname === "/cart";

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
      {!isHome && !isCart && <Footer />}
    </QueryClientProvider>
  );
}

export default App;
