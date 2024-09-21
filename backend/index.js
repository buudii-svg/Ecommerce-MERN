const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");

app.use(cors());
app.use(express.json());


// DB Connection
mongoose
  .connect(
    "mongodb+srv://corebasics:corebasics@cluster0.zcmkf8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });


// API Creation
app.get("/", (req, res) => {
  res.send("Express is running");
});

// Ensure upload directory exists
const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Img storage engine
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// Creating upload API for imgs
app.use("/images", express.static(uploadDir));
app.post(
  "/upload",
  upload.fields([
    { name: "product_images", maxCount: 10 },
    { name: "size_chart", maxCount: 1 },
  ]),
  (req, res) => {
    if (
      !req.files ||
      !req.files["product_images"] ||
      !req.files["size_chart"]
    ) {
      return res.status(400).json({ success: 0, message: "Missing files." });
    }

    const imageUrls = req.files["product_images"].map(
      (file) => `http://localhost:${port}/images/${file.filename}`
    );
    const sizeChartUrl = `http://localhost:${port}/images/${req.files["size_chart"][0].filename}`;

    res.json({
      success: 1,
      image_urls: imageUrls,
      size_chart_url: sizeChartUrl,
    });
  }
);


//Schema for creating product
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  images: { type: [String], required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
  description: { type: String },
  quantity: { type: Number, default: 1 },
  size_chart: { type: String }, // Path to size chart image
  sizes: { type: [String] }, // Array of dynamic sizes
});

const Product = mongoose.model("Product", productSchema);

// Creating API for adding products
app.post("/addProduct", async (req, res) => {
  try {
    const products = await Product.find({});
    const id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    // Ensure req.body.sizes is handled correctly as an array of characters
    const sizes = Array.isArray(req.body.sizes)
      ? req.body.sizes
      : req.body.sizes.split("");

    const newProduct = new Product({
      id,
      name: req.body.name,
      images: req.body.images,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      quantity: req.body.quantity,
      description: req.body.description,
      sizes: sizes, // Include parsed sizes array
      size_chart: req.body.size_chart, // Include size_chart attribute
    });

    await newProduct.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// Creating API for removing products
app.post("/removeProduct", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.body.id });
    if (product) {
      res.json({ success: true, name: product.name });
    } else {
      res.status(404).json({ success: false, message: "Product not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while removing the product.",
      });
  }
});

// Creating API for getting all products
app.get("/allProducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while fetching products.",
      });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update an existing product
app.put("/updateproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;

    // Find the product by ID and update its details
    await Product.findOneAndUpdate({ id: productId }, updatedProduct);

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// Schema for user model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //mobile: { type: String, required: true },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Creating endpoint for registration
app.post("/register", async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(400)
        .json({ success: false, errors: "This email has already an account" });
    }
    let cart = {};
    for (let i = 0; i < 101; i++) {
      cart[i] = 0;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      //mobile: req.body.mobile,
      cartData: cart,
    });
    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Creating endpoint for login
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: true, token });
      } else {
        res.status(400).json({ success: false, errors: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ success: false, errors: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Creating endpoint for latest products
app.get("/latestProducts", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Creating endpoint for popular products
app.get("/popularProducts", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(3);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Creating middleware to fetch user
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ success: false, errors: "Invalid Token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, errors: "Invalid Token" });
  }
};

// Creating endpoint for add to cart
app.post("/addToCart", fetchUser, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.productId] =
      userData.cartData[req.body.productId] + 1 || 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.json({ success: true, message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Creating endpoint for remove from cart
app.post("/removeFromCart", fetchUser, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.productId] > 0) {
      userData.cartData[req.body.productId] -= 1;
      if (userData.cartData[req.body.productId] === 0) {
        delete userData.cartData[req.body.productId];
      }
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
      );
      res.json({ success: true, message: "Product removed from cart" });
    } else {
      res.status(400).json({ success: false, message: "Product not in cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Creating endpoint for get cart
app.get("/getCart", fetchUser, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Creating coupon schema
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true }, // percentage
  expiryDate: { type: Date, required: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);

//Creating Enpoint to add coupon
app.post("/addCoupon", async (req, res) => {
  try {
    const { code, discount, expiryDate } = req.body;
    const newCoupon = new Coupon({
      code,
      discount,
      expiryDate,
    });
    await newCoupon.save();
    res.json({ success: true, message: "Coupon added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Creating endpoint to apply coupon
app.post("/applyCoupon", async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid coupon code" });
    }

    if (new Date() > new Date(coupon.expiryDate)) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon has expired" });
    }

    res.json({ success: true, discount: coupon.discount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



app.listen(port, (error) => {
  if (!error) console.log(`Server is running on port ${port}`);
  else {
    console.log(`Error while running server ${error}`);
  }
});
