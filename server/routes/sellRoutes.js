const express = require("express");

// controller functions
const {
  getSells,
  getSell,
  createSell,
 
} = require("../controllers/sellController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// signup route
router.post("/", createSell);

// GET all Sells (requires authentication)
router.get("/", getSells);

// GET a single Sell (requires authentication)
router.get("/:id", getSell);


module.exports = router;
