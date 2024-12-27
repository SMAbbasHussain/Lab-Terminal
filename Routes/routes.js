const express = require("express");
const {
  addAttraction,
  addVisitor,
  addReview,
  getTopRatedAttractions,
  getVisitorActivity,
  addVisitedAttraction
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

// Add a visited attraction for a visitor
router.post("/visitors/:visitorId/visited-attraction", addVisitedAttraction);

module.exports = router;
