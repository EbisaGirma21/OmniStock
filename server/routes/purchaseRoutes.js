const express = require("express");

// controller functions
const {
  getPurchases,
  getPurchase,
  createPurchase,
 
} = require("../controllers/purchaseController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// signup route
router.post("/", createPurchase);

// GET all Purchases (requires authentication)
router.get("/", getPurchases);

// GET a single Purchase (requires authentication)
router.get("/:id", getPurchase);


module.exports = router;
