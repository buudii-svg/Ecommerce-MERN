import { useEffect, useState } from "react";
import { TbTrash,TbEdit } from "react-icons/tb";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

const RemoveProduct = async (product) => {
  if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      body: JSON.stringify({ id: product.id }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    await fetchInfo();
  }
};
const EditProduct = async (product) => {
  // Prompt user for new values
  const newTitle = prompt("Enter new title:", product.name);
  const newDescription = prompt("Enter new description:", product.description);
  const newOldPrice = prompt("Enter new offer price:", product.old_price);
  const newNewPrice = prompt("Enter new price:", product.new_price);
  const newQuantity = prompt("Enter new quantity:", product.quantity);

  // If user cancels, do nothing
  if (
    !newTitle ||
    !newDescription ||
    !newOldPrice ||
    !newNewPrice ||
    !newQuantity
  )
    return;

  // Update the product object
  const updatedProduct = {
    ...product,
    name: newTitle,
    description: newDescription,
    old_price: newOldPrice,
    new_price: newNewPrice,
    quantity: newQuantity,
  };

  // Send request to update the product
  const response = await fetch(
    `http://localhost:4000/updateproduct/${product.id}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (data.success) {
   alert("Product Updated Successfully")       
    await fetchInfo(); // Fetch updated product list
  } else {
    alert("Product not Added");
  }
};


  return (
    <div className="p-2 bg-white box-border mb-0 rounded-sm w-full mt-4 sm:p-4 sm:m-7">
      <h4 className="bold-22 p-5 uppercase">Product List</h4>
      <div className="max-h-[77vh] overflow-auto px-4 text-center ">
        <table className="w-full mx-auto">
          <thead>
            <tr className="bg-primary bold-14 sm:regular-22 text-start py-12 ">
              <th className="p-2">Products</th>
              <th className="p-2">Title</th>
              <th className="p-2">Offer Price</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2"></th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, i) => (
              <tr
                key={i}
                className="border-b border-slate-900/20 tetx-gary-20 p-6 medium-14"
              >
                <td className="flexStart sm:flexCenter ">
                  <img
                    src={product.images[0]}
                    alt=""
                    height={55}
                    width={55}
                    className="rounded-lg ring-1 ring-slate-900/5 my-1"
                  />
                </td>
                <td>
                  <div className="line-clamp-3">{product.name}</div>
                </td>
                <td>{product.old_price}</td>
                <td>{product.new_price}</td>
                <td>{product.quantity}</td>
                <td>
                  <div className="bold-22 pl-6 sm:pl-14 ">
                    <TbEdit
                      onClick={() => EditProduct(product)}
                      className="cursor-pointer"
                    />
                  </div>
                </td>
                <td>
                  <div className="bold-22 pl-6 sm:pl-14 ">
                    <TbTrash
                      onClick={() => RemoveProduct(product)}
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProduct;
