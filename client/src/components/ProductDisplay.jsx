import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdStar } from "react-icons/md";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]); // Default to first size
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product quantity from the database
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/product/${product.id}`
        );
        if (response.data.success) {
          setQuantity(response.data.product.quantity);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product.id]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleBuyNow = () => {
    addToCart(product.id, selectedSize);
    navigate("/cart-page");
  };

  return (
    <section>
      <div className="flex flex-col gap-14 xl:flex-row">
        {/* left side */}
        <div className="flex gap-x-2 xl:flex-1">
          <div className="flex flex-col gap-[7px] flex-wrap">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Thumbnail ${index + 1}`}
                className="max-h-[99px] cursor-pointer"
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
          <div>
            <img src={mainImage} alt={product.name} className="max-h-[418px]" />
          </div>
        </div>
        {/* right side */}
        <div className="flex-col flex xl:flex-[2.5]">
          <h3 className="h3">{product.name}</h3>
          <div className="flex gap-x-2 text-secondary medium-22">
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <p>(111)</p>
          </div>
          <div className="flex gap-x-6 medium-20 my-4">
            <div>{product.new_price}</div>
          </div>
          <div className="mb-4">
            <p>
              <span className="medium-16 text-tertiary">
                Available Quantity:
              </span>{" "}
              {product.quantity}
            </p>
            <h4 className="bold-16">Select Size:</h4>
            <div className="flex gap-3 my-3">
              {product.sizes.map((size, index) => (
                <div
                  key={index}
                  className={`ring-2  h-10 w-10 flexCenter cursor-pointer ${
                    selectedSize === size
                      ? "ring-slate-900"
                      : "ring-slate-900/5"
                  }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
              <button
                onClick={() => addToCart(product.id, selectedSize)}
                className="btn_dark_outline !rounded-none uppercase regular-14 tracking-widest"
              >
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest"
              >
                Buy It Now
              </button>
            </div>
            <p>
              <span className="medium-16 text-tertiary">Category :</span> Women
              | Basics | Summer
            </p>
            <p>
              <span className="medium-16 text-tertiary">Tags :</span> Modern |
              Latest
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
