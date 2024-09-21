import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";
import { IoReorderFourSharp } from "react-icons/io5";


const Sidebar = () => {
  return (
    <div className="justify-center py-7 flex gap-x-2 gap-y-5 w-full  bg-white *:sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6">
      <Link to={"/addProduct"}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-14 w-44 medium-16 sm:medium-16 xs:w-44">
          <IoMdAdd />
          <span>Add Product</span>
        </button>
      </Link>
      <Link to={"/addPromo"}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-14 w-44 medium-16 sm:medium-16 xs:w-44">
          <RiCoupon2Fill />
          <span>Add Coupon</span>
        </button>
      </Link>
      <Link to={"/listProduct"}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-14 w-44 medium-16 sm:medium-16 xs:w-44">
          <MdOutlineProductionQuantityLimits />
          <span>All Products</span>
        </button>
      </Link>
      <Link to={"/listOrders"}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-14 w-44 medium-16 sm:medium-16 xs:w-44">
          <IoReorderFourSharp />
          <span>All Orders</span>
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;
