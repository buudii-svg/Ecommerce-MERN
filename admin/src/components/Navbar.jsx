import logo from "../assets/logo.jpg";
import profileImg from "../assets/profile.png";

const Navbar = () => {
  return (
    <nav className="max_padd_container flexBetween bg-white py-2 ring-1 ring-slate-900/5 realtive">
      <div>
        <img src={logo} alt="" />
      </div>
      <div className="bg-black text-white uppercase bold-22 px-3 rounded-md tracking-widest line-clamp max-xs:bold-18 max-xs:py-2 max-xs:px-1">
        Admin Panel
      </div>
      <div>
        <img src={profileImg} alt="" className="h-12 w-12 rounded-full" />
      </div>
    </nav>
  );
};

export default Navbar;
