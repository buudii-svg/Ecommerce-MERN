import { useState } from "react";
import axios from "axios";

const AddPromo = () => {
  const [coupon, setCoupon] = useState({
    code: "",
    discount: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const addCoupon = async () => {
    try {
      await axios.post("http://localhost:4000/addCoupon", coupon);
      alert("Coupon added successfully");
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  return (
    <div className="p-8 box-border bg-white w-full rounded-md mt-4 lg:m-7">
      <div className="mb-3">
        <h4 className="bold-18 pb-2 ">Coupon Code:</h4>
        <input
          type="text"
          name="code"
          value={coupon.code}
          onChange={handleChange}
          placeholder="Type Here..."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          required
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2 ">Discount Percentage:</h4>
        <input
          type="number"
          name="discount"
          value={coupon.discount}
          onChange={handleChange}
          placeholder="Type Here..."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          required
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2 ">Expiry Date:</h4>
        <input
          type="date"
          name="expiryDate"
          value={coupon.expiryDate}
          onChange={handleChange}
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          required
        />
      </div>
      <button
        onClick={addCoupon}
        className="btn_dark_rounded mt-4 flexCenter gap-x-1 "
      >
        Add Coupon
      </button>
    </div>
  );
};

export default AddPromo;
