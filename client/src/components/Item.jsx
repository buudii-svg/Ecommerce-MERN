import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Item = ({ id, name, images = [], new_price }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 10000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      <div className="relative flexCenter group overflow-hidden transition-all duration-100">
        <Link
          onClick={() => window.scrollTo(0, 0)}
          to={`/product/${id}`}
          className="h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 !py-2 z-20  scale-0 group-hover:scale-100 transition-all duration-700"
        >
          <FaSearch className="hover:rotate-90 hover:scale-125 transition-all duration-200" />
        </Link>
        <img
          src={images[currentImageIndex] || ""} // Use the first image or an empty string if images is empty
          alt="productImage"
          className="w-full block object-cover group-hover:scale-110 transition-all duration-1000"
        />
      </div>
      <div className="p-4 overflow-hidden">
        <h4 className="my-[6px] medium-16 line-clamp-2 text-gray-30">{name}</h4>
        <div className="flex gap-5">
          <div className="bold-16">{new_price}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
