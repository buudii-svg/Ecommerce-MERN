import { Route, Routes } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import AddProduct from "../components/AddProduct";
import ListProduct from "../components/ListProduct";
import AddPromo from "../components/AddPromo";
import ListOrders from "../components/ListOrders";

const Admin = () => {
  return (
    <div className="lg:flex">
      <Sidebar />
      <Routes>
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/listProduct" element={<ListProduct />} />
        <Route path="/addPromo" element={<AddPromo />} />
        <Route path="/listOrders" element={<ListOrders />} />
      </Routes>
    </div>
  );
}

export default Admin