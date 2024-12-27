const mongoose = require("mongoose");

// Define the Attraction schema
const attractionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  entryFee: {
    type: Number,
    required: true,
    min: [0, "Entry fee cannot be negative"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot be greater than 5"],
  },
});

// Define the Visitor schema
const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },
  visitedAttractions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Attraction" },
  ],
});

// Define the Review schema
const reviewSchema = new mongoose.Schema({
  attraction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attraction",
    required: true,
  },
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visitor",
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: [1, "Score must be at least 1"],
    max: [5, "Score cannot be more than 5"],
  },
  comment: { type: String },
});

// Ensure a visitor cannot review the same attraction twice
reviewSchema.index({ attraction: 1, visitor: 1 }, { unique: true });

// Create models
const Attraction = mongoose.model("Attraction", attractionSchema);
const Visitor = mongoose.model("Visitor", visitorSchema);
const Review = mongoose.model("Review", reviewSchema);

module.exports = { Attraction, Visitor, Review };
