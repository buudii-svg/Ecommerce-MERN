import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import bannerWomens from "./assets/bannerwomens.png";
import About from "./pages/About";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <main className="bg-primary text-tertiary">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/women"
          element={<Category category="women" banner={bannerWomens} />}
        />
        <Route path="/product">
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cart-page" element={<Cart />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </main>
  );
}
