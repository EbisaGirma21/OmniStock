const express = require("express");

// controller functions
const {
  getRequests,
  createRequest,
  updateRequest,
} = require("../controllers/requestController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// create route
router.post("/", createRequest);

// update route
router.patch("/:id", updateRequest);

// GET all Requests (requires authentication)
router.get("/", getRequests);

module.exports = router;
