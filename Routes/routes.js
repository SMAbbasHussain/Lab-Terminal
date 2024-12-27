const express = require("express");
const {
  addAttraction,
  addVisitor,
  addReview,
  getTopRatedAttractions,
  getVisitorActivity,
} = require("../controllers/controllers");

const router = express.Router();

// Attraction routes
router.post("/attractions", addAttraction);
router.get("/attractions/top-rated", getTopRatedAttractions);

// Visitor routes
router.post("/visitors", addVisitor);
router.get("/visitors/activity", getVisitorActivity);

// Review routes
router.post("/reviews", addReview);

module.exports = router;
