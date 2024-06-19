const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.CNCTN_PORT



app.use(
  cors({
    origin: ["http://localhost:5173","https://65bb3475e18bb4359d2ac969--jocular-dango-6426fd.netlify.app","https://65c48e84c57ca24cb6f6f16c--joyful-vacherin-b5fc8c.netlify.app"],
    methods: ["GET", "POST","PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const Products = require("./Routes/productRoutes");
const Users = require("./Routes/userRoutes");
const Categories = require("./Routes/categoryRoutes");
const Addresses = require("./Routes/addressRoutes");
const Orders = require("./Routes/orderRoutes");
const Reviews = require("./Routes/reviewroutes");
const Stripe = require("./Routes/stripeRoutes");
const Coupons = require("./Routes/couponRoutes");

app.use("/products", Products);
app.use("/users", Users);
app.use("/categories", Categories);
app.use("/addresses", Addresses);
app.use("/orders", Orders);
app.use("/reviews", Reviews);
app.use("/checkout-session", Stripe);
app.use("/coupons", Coupons);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main()
  .then((data) => console.log("db connected"))
  .catch((err) => console.log(err));

async function main() {
  const URL = process.env.DB_URL;

  const URLwithPSWD = URL.replace("<password>", process.env.DB_PASSWORD);
  await mongoose.connect(URLwithPSWD);
}
