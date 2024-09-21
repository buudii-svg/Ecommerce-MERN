import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import Navbar from "./Navbar";
import { useState, useContext } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FaOpencart } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { ShopContext } from "../Context/ShopContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <header className="fixed top-0 left-0 m-auto max_padd_header w-full bg-white ring-1 ring-slate-900/5 z-10">
      <div className="px-2 flexBetween py-3 max-xs:px-2">
        {/* container for logo and menu button */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* menu button */}
          <div className="flex items-center">
            {!menuOpened ? (
              <MdMenu
                className="md:hidden cursor-pointer hover:text-secondary p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full hover:ring-secondary"
                onClick={toggleMenu}
              />
            ) : (
              <MdClose
                className="md:hidden cursor-pointer hover:text-secondary p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full hover:ring-secondary"
                onClick={toggleMenu}
              />
            )}
          </div>
          {/* logo */}
          <div className="flex-grow text-center md:ml-4">
            <Link to={"/"}>
              <img src={logo} alt="Logo" className="h-16 w-16 mx-auto" />
            </Link>
          </div>
        </div>

        {/* navbar desktop */}
        <Navbar
          containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15 "}
        />

        {/* navbar mobile */}
        <Navbar
          containerStyles={`${
            menuOpened
              ? "flex item-start flex-col gap-y-12 fixed top-20 left-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
              : "flex item-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -left-[100%]"
          }`}
        />

        {/* buttons */}
        <div className="flexBetween sm:gap-x-2 bold-16">
          <div className="flexBetween sm:gap-x-6">
            <NavLink to={"cart-page"} className={"flex"}>
              <FaOpencart className="p-1 h-8 w-8 ring-1 ring-slate-900/30 rounded-full" />
              <span className="flexCenter relative w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2">
                {getTotalCartItems()}
              </span>
            </NavLink>
            {localStorage.getItem("auth-token") ? (
              <NavLink
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.replace("/");
                }}
                className={"btn_dark_rounded flexCenter gap-x-2 medium-16"}
              >
                <TbLogout2 />
                Logout
              </NavLink>
            ) : (
              <NavLink
                to={"login"}
                className={"btn_dark_rounded flexCenter gap-x-2 medium-16"}
              >
                <CiUser className="bold-20" />
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
