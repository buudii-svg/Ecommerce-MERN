import { useState } from "react";
import upload_area from "../assets/upload_area.svg";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [sizeChart, setSizeChart] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");

  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "women",
    quantity: 1,
    description: "",
  });

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const sizeChartHandler = (e) => {
    setSizeChart(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

const addSize = () => {
  if (sizeInput) {
    const sizeCharacters = sizeInput.split(""); // Split string into array of characters
    setSizes((prevSizes) => [...prevSizes, ...sizeCharacters]);
    setSizeInput("");
  }
};


const Add_Product = async () => {
  // Validate form inputs and files
  if (
    !productDetails.name ||
    !productDetails.old_price ||
    !productDetails.new_price ||
    !productDetails.description ||
    images.length === 0 ||
    !productDetails.quantity ||
    sizes.length === 0 ||
    !sizeChart
  ) {
    alert(
      "Please fill in all the required fields and choose at least one photo."
    );
    return;
  }

  try {
    // Prepare form data
    let formData = new FormData();
    images.forEach((image, index) => {
      formData.append("product_images", image);
    });
    formData.append("size_chart", sizeChart);
    formData.append("sizes", JSON.stringify(sizes)); // Convert sizes array to JSON string

    // Upload images and size chart
    const uploadResponse = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });
    const uploadData = await uploadResponse.json();

    if (!uploadData.success) {
      throw new Error("Failed to upload images and size chart.");
    }

    // Update product details with uploaded URLs
    const product = {
      ...productDetails,
      images: uploadData.image_urls,
      size_chart: uploadData.size_chart_url,
      sizes: sizes, // Include sizes array
    };

    // Add product with updated details
    const addProductResponse = await fetch("http://localhost:4000/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const addProductData = await addProductResponse.json();

    if (addProductData.success) {
      alert("Product Added Successfully");
    } else {
      throw new Error("Failed to add product.");
    }
  } catch (error) {
    console.error("Error adding product:", error.message);
    alert("Product not Added. Please try again later.");
  }
};


  return (
    <div className="p-8 box-border bg-white w-full rounded-md mt-4 lg:m-7">
      <div className="mb-3">
        <h4 className="bold-18 pb-2 ">Product Title:</h4>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here..."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          required
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2 ">Description:</h4>
        <input
          value={productDetails.description}
          onChange={changeHandler}
          type="text"
          name="description"
          placeholder="Type Here..."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2 ">Price:</h4>
        <input
          value={productDetails.old_price}
          onChange={changeHandler}
          type="text"
          name="old_price"
          placeholder="Type Here..."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2 ">Offer Price:</h4>
        <input
          value={productDetails.new_price}
          onChange={changeHandler}
          type="text"
          name="new_price"
          placeholder="Type Here..."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          required
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2 ">Quantity:</h4>
        <input
          value={productDetails.quantity}
          onChange={changeHandler}
          type="number"
          name="quantity"
          placeholder="Type Here..."
          className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          required
        />
      </div>
      <div className="mb-3 flex items-center gap-x-4 ">
        <h4 className="bold-18 pb-2">Category:</h4>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none"
          required
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Sizes:</h4>
        <div className="flex gap-x-2 mb-2">
          <input
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            type="text"
            name="size"
            placeholder="Add Size"
            className="bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md"
          />
          <button onClick={addSize} className="btn_dark_rounded">
            Add
          </button>
        </div>
        <div>
          {sizes.map((size, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 p-2 m-1 rounded"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="bold-18 pb-2">Product Images:</h4>
        <label htmlFor="file-input">
          <img
            src={
              images.length > 0 ? URL.createObjectURL(images[0]) : upload_area
            }
            alt=""
            className="w-20 rounded-sm inline-block"
          />
          <input
            onChange={imageHandler}
            type="file"
            name="images"
            id="file-input"
            hidden
            multiple
            className="bg-primary max-w-80 w-full py-3 px-4 "
            required
          />
        </label>
      </div>
      <div>
        <h4 className="bold-18 pb-2">Size Chart:</h4>
        <label htmlFor="size-chart-input">
          <img
            src={sizeChart ? URL.createObjectURL(sizeChart) : upload_area}
            alt=""
            className="w-20 rounded-sm inline-block"
          />
          <input
            onChange={sizeChartHandler}
            type="file"
            name="size_chart"
            id="size-chart-input"
            hidden
            className="bg-primary max-w-80 w-full py-3 px-4"
            required
          />
        </label>
      </div>
      <button
        onClick={() => Add_Product()}
        className="btn_dark_rounded mt-4 flexCenter gap-x-1 "
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
