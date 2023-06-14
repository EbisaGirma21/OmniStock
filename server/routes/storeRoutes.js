const express = require("express");

// controller functions
const {
  getStores,
  getStore,
  createStore,
  deleteStore,
  updateStore,
} = require("../controllers/storeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET all Stores
router.get("/", getStores);

// GET a single Store
router.get("/:id", getStore);

// post route
router.post("/", createStore);

// DELETE a Store
router.delete("/:id", deleteStore);

// UPDATE a Store
router.patch("/:id", updateStore);

module.exports = router;
