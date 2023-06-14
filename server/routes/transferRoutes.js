const express = require("express");

// controller functions
const { transferVariant } = require("../controllers/transferController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// signup route  (requires authorization)
router.patch("/", transferVariant);

module.exports = router;
