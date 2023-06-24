const express = require("express");

// controller functions
const {
  transferVariant,
  getTransfers,
} = require("../controllers/transferController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// transfer route  (requires authorization)
router.patch("/", transferVariant);

// get route  (requires authorization)
router.get("/", getTransfers);

module.exports = router;
