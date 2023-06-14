const express = require("express");

// controller functions
const {
  getProductCatagorys,
  getProductCatagory,
  createProductCatagory,
  deleteProductCatagory,
  updateProductCatagory,
} = require("../controllers/productCatagoryController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// signup route
router.post("/", createProductCatagory);

// GET all ProductCatagorys (requires authentication)
router.get("/", getProductCatagorys);

// GET a single ProductCatagory (requires authentication)
router.get("/:id", getProductCatagory);

// DELETE a ProductCatagory (requires authentication)
router.delete("/:id", deleteProductCatagory);

// UPDATE a ProductCatagory (requires authentication)
router.patch("/:id", updateProductCatagory);

module.exports = router;
