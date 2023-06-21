const express = require("express");

// controller functions
const {
  getRequests,
  createRequest,
} = require("../controllers/requestController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// signup route
router.post("/", createRequest);

// GET all Requests (requires authentication)
router.get("/", getRequests);

module.exports = router;
