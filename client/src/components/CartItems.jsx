import { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


const CartItems = () => {
  const { all_products, cartItems, removeFromCart, getCartTotalAmount } =
    useContext(ShopContext);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    city: "",
  });

  // State variables for individual field errors
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cityError, setCityError] = useState("");

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post("http://localhost:4000/applyCoupon", {
        code: couponCode,
      });
      if (response.data.success) {
        setDiscount(response.data.discount);
        setCouponError("");
      } else {
        setCouponError(response.data.message);
        setDiscount(0);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponError("An error occurred while applying the coupon");
      setDiscount(0);
    }
  };

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    const isAuthenticated = localStorage.getItem("auth-token");

    if (!isAuthenticated) {
      // If not authenticated, navigate to the login page
      navigate("/login");
    } else {
      // If authenticated, validate shipping information and proceed with checkout
      let isValid = true;

      if (!shippingInfo.name) {
        setNameError("Please enter your name.");
        isValid = false;
      } else {
        setNameError("");
      }

      if (!shippingInfo.mobile) {
        setMobileError("Please enter your mobile number.");
        isValid = false;
      } else {
        setMobileError("");
      }

      if (!shippingInfo.address) {
        setAddressError("Please enter your address.");
        isValid = false;
      } else {
        setAddressError("");
      }

      if (!shippingInfo.email) {
        setEmailError("Please enter your email.");
        isValid = false;
      } else {
        setEmailError("");
      }

      if (!shippingInfo.city) {
        setCityError("Please select your city.");
        isValid = false;
      } else {
        setCityError("");
      }

      // If all fields are valid, proceed with checkout logic
      if (isValid) {
        console.log("Proceed to checkout:", shippingInfo);
        // Place your checkout logic here
      }
    }
  };

  const totalAmount = getCartTotalAmount();
  const discountedTotal = totalAmount - (totalAmount * discount) / 100;

  return (
    <section className="max_padd_container pt-28">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-slate-900/10 regular-18 sm:regular-22 text-start py-12">
              <th className="p-1 py-2">Products</th>
              <th className="p-1 py-2">Title</th>
              <th className="p-1 py-2">Price</th>
              <th className="p-1 py-2">Size</th>
              <th className="p-1 py-2">Quantity</th>
              <th className="p-1 py-2">Total</th>
              <th className="p-1 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {all_products.map((e) => {
              return Object.keys(cartItems).map((key) => {
                const [productId, size] = key.split("_");
                if (productId == e.id && cartItems[key].quantity > 0) {
                  return (
                    <tr
                      key={key}
                      className="border-b border-slate-900/20 p-6 medium-14 text-center text-gray-30"
                    >
                      <td className="flexCenter">
                        <img
                          src={e.images[0]}
                          alt="Product"
                          height={44}
                          width={44}
                          className="rounded-lg ring-1 ring-slate-900/5 my-1"
                        />
                      </td>
                      <td>
                        <div className="line-clamp-3">{e.name}</div>
                      </td>
                      <td>{e.new_price}</td>
                      <td>{size}</td>
                      <td>{cartItems[key].quantity}</td>
                      <td>{cartItems[key].quantity * e.new_price}</td>
                      <td>
                        <div className="bold-22 pl-14">
                          <TbTrash
                            className="cursor-pointer"
                            onClick={() => {
                              removeFromCart(e.id, size);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
                return null;
              });
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row gap-20 my-16 p-8 bg-white w-full">
        {/* Shipping Information */}
        <div className="flex flex-col gap-10 w-full md:w-1/2">
          <h4 className="bold-20">Shipping Information</h4>
          <form className="w-full max-w-lg">
            {/* Name */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  Name
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    nameError ? "border-red-500" : "border-gray-200"
                  } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-name"
                  type="text"
                  name="name"
                  placeholder="Jane"
                  value={shippingInfo.name}
                  onChange={handleChange}
                />
                {nameError && (
                  <p className="text-red-500 text-xs italic">{nameError}</p>
                )}
              </div>
              {/* Mobile Number */}
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-mobile"
                >
                  Mobile Number
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    mobileError ? "border-red-500" : "border-gray-200"
                  } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-mobile"
                  type="text"
                  name="mobile"
                  placeholder="1234567890"
                  value={shippingInfo.mobile}
                  onChange={handleChange}
                />
                {mobileError && (
                  <p className="text-red-500 text-xs italic">{mobileError}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-email"
                >
                  Email
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    emailError ? "border-red-500" : "border-gray-200"
                  } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-email"
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  value={shippingInfo.email}
                  onChange={handleChange}
                />
                {emailError && (
                  <p className="text-red-500 text-xs italic">{emailError}</p>
                )}
              </div>
            </div>
            {/* City */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  City
                </label>
                <select
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    cityError ? "border-red-500" : "border-gray-200"
                  } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleChange}
                >
                  <option value="">Select a city</option>
                  <option value="Cairo">Cairo</option>
                  <option value="Alexandria">Alexandria</option>
                </select>
                {cityError && (
                  <p className="text-red-500 text-xs italic">{cityError}</p>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-address"
                >
                  Address
                </label>
                <input
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                    addressError ? "border-red-500" : "border-gray-200"
                  } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                  id="grid-address"
                  type="text"
                  name="address"
                  placeholder="123 Main St"
                  value={shippingInfo.address}
                  onChange={handleChange}
                />
                {addressError && (
                  <p className="text-red-500 text-xs italic">{addressError}</p>
                )}
              </div>
            </div>
          </form>
        </div>
        {/* Summary section */}
        <div className="flex flex-col gap-10 w-full md:w-1/2">
          <h4 className="bold-20">Summary</h4>
          <div>
            <div className="flexBetween py-4">
              <h4 className="medium-16">Subtotal:</h4>
              <h4 className="text-gray-30 font-semibold">{totalAmount}</h4>
            </div>
            <hr />
            <div className="flexBetween py-4">
              <h4 className="medium-16">Discount:</h4>
              <h4 className="text-gray-30 font-semibold">
                {discount}% ({(totalAmount * discount) / 100})
              </h4>
            </div>
            <hr />
            <div className="flexBetween py-4">
              <h4 className="medium-16">Shipping Fee:</h4>
              <h4 className="text-gray-30 font-semibold">70</h4>
            </div>
            <hr />
            <div className="flexBetween py-4">
              <h4 className="bold-18">Total:</h4>
              <h4 className="bold-18">{discountedTotal + 70}</h4>
            </div>
          </div>
          <div className="flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-slate-900/10">
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="bg-transparent border-none outline-none w-full"
            />
            <button onClick={handleApplyCoupon} className="btn_dark_rounded">
              Apply
            </button>
          </div>
          {couponError && (
            <p className="text-red-500 text-sm mt-2">{couponError}</p>
          )}
          <button onClick={handleCheckout} className="btn_dark_rounded w-44">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartItems;


