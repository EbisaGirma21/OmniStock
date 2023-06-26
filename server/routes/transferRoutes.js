const express = require("express");

// controller functions
const {
  transferVariant,
  getTransfers,
} = require("../controllers/transferController");
const {adminRequireAuth} = require("../middleware/requireAuth");

const router = express.Router();

// transfer route  (requires authorization)
router.patch("/", adminRequireAuth, transferVariant);

// get route  (requires authorization)
router.get("/", adminRequireAuth, getTransfers);

module.exports = router;
