const express = require("express");

// controller functions
const {
  getSells,
  getSell,
  createSell,
 
} = require("../controllers/sellController");
const {requireAuth} = require("../middleware/requireAuth");

const router = express.Router();

// signup route
router.post("/",requireAuth, createSell);

// GET all Sells (requires authentication)
router.get("/",requireAuth, getSells);

// GET a single Sell (requires authentication)
router.get("/:id",requireAuth, getSell);


module.exports = router;
