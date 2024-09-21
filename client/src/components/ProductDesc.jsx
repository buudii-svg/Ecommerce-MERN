/* eslint-disable react/prop-types */
import { useState } from "react";

const ProductDesc = ({ product }) => {
  const [showDescription, setShowDescription] = useState(true);

  return (
    <div className="mt-20">
      <div className="flex gap-3 mb-4">
        <button
          className={`btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 ${
            showDescription ? "btn_dark_rounded" : "btn_dark_outline"
          }`}
          onClick={() => setShowDescription(true)}
        >
          Description
        </button>
        <button
          className={`btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 ${
            !showDescription ? "btn_dark_rounded" : "btn_dark_outline"
          }`}
          onClick={() => setShowDescription(false)}
        >
          Size Guide
        </button>
      </div>
      <div className="flex flex-col pb-16">
        {showDescription ? (
          <p className="text-sm">{product.description}</p>
        ) : (
          <div className="flex justify-start">
            <img
              src={product.size_chart} // Use product.size_chart as the source for size guide image
              alt="Size Guide"
              className="max-h-[400px] object-contain" // Adjust max height and width as needed
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDesc;
