import { MdPolicy, MdHomeFilled } from "react-icons/md";
import { TbAlertHexagonFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom"


// eslint-disable-next-line react/prop-types
const Navbar = ({ containerStyles }) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flexCenter gap-x-1">
          <MdHomeFilled /> Home
        </div>
      </NavLink>
      <NavLink
        to={"/aboutus"}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flexCenter gap-x-1">
          <TbAlertHexagonFilled /> About Us
        </div>
      </NavLink>
      <NavLink
        to={"/terms"}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flexCenter gap-x-1"><MdPolicy/> Terms</div>
      </NavLink>
    </nav>
  );
};

export default Navbar