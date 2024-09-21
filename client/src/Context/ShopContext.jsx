import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  return {};
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_products, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all products
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAllProducts(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    // Fetch cart data if user is logged in
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/getCart", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error("Failed to fetch cart data");
        })
        .then((data) => setCartItems(data))
        .catch((error) => {
          setError(error);
          setCartItems(getDefaultCart()); // Reset cart on error
        });
    }
  }, []);

  const addToCart = (productId, size) => {
    const key = `${productId}_${size}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: { quantity: (prev[key]?.quantity || 0) + 1, size: size },
    }));
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/addToCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ productId: productId, size: size }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            throw new Error(data.message);
          }
        })
        .catch((error) => setError(error));
    }
  };

  const removeFromCart = (productId, size) => {
    const key = `${productId}_${size}`;
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[key].quantity > 1) {
        newCartItems[key].quantity -= 1;
      } else {
        delete newCartItems[key];
      }
      return newCartItems;
    });
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/removeFromCart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ productId: productId, size: size }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            throw new Error(data.message);
          }
        })
        .catch((error) => setError(error));
    }
  };

  const getCartTotalAmount = () => {
    return Object.keys(cartItems).reduce((total, key) => {
      if (cartItems[key].quantity > 0) {
        const [productId] = key.split("_");
        const itemInfo = all_products.find(
          (product) => product.id === Number(productId)
        );
        return total + (itemInfo?.new_price || 0) * cartItems[key].quantity;
      }
      return total;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.keys(cartItems).reduce((total, key) => {
      if (cartItems[key].quantity > 0) {
        return total + cartItems[key].quantity;
      }
      return total;
    }, 0);
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotalAmount,
    getTotalCartItems,
    loading,
    error,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
