import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ShopContextProvider from "./Context/ShopContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </Router>
  </React.StrictMode>
);
