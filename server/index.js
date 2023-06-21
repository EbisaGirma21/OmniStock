require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");
const productCatagoryRoutes = require("./routes/productCatagoryRoutes");
const variantRoutes = require("./routes/variantRoutes");
const sellRoutes = require("./routes/sellRoutes");
const transferRoutes = require("./routes/transferRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const requestRoutes = require("./routes/requestRoutes");

// express app
const app = express();
app.use(cors());

// middleware
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/productCatagory", productCatagoryRoutes);
app.use("/api/variant", variantRoutes);
app.use("/api/sell", sellRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/request", requestRoutes);

// MONGOOSE CONFIGURATION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
