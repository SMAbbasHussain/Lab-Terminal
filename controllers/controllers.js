const { Attraction, Visitor, Review } = require("../Models/models");

/** ------------------------- Attraction Logic ------------------------- */

// Add a new attraction
exports.addAttraction = async (req, res) => {
  try {
    const { name, location, entryFee } = req.body;

    if (!name || !location || entryFee === undefined) {
      return res.status(400).json({ error: "Name, location, and entry fee are required" });
    }

    // Check if the attraction already exists by name
    const existingAttraction = await Attraction.findOne({ name });
    if (existingAttraction) {
      return res.status(400).json({ error: "Attraction with this name already exists" });
    }

    const attraction = await Attraction.create({ name, location, entryFee });
    res.status(201).json(attraction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update attraction rating
exports.updateAttractionRating = async (attractionId) => {
  const reviews = await Review.find({ attraction: attractionId });
  const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
  const averageRating = totalScore / reviews.length;

  await Attraction.findByIdAndUpdate(
    attractionId,
    { rating: averageRating || 0 },
    { new: true }
  );
};


/** ------------------------- Visitor Logic ------------------------- */

// Add a new visitor
exports.addVisitor = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const visitor = await Visitor.create({ name, email });
    res.status(201).json(visitor);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

/** ------------------------- Review Logic ------------------------- */

// Add a review
exports.addReview = async (req, res) => {
  try {
    const { attraction, visitor, score, comment } = req.body;

    if (!attraction || !visitor || score === undefined) {
      return res.status(400).json({ error: "Attraction, visitor, and score are required" });
    }

    const visitorExists = await Visitor.findById(visitor);
    if (!visitorExists) {
      return res.status(404).json({ error: "Visitor does not exist" });
    }

    const existingReview = await Review.findOne({ attraction, visitor });
    if (existingReview) {
      return res.status(400).json({ error: "Visitor has already reviewed this attraction" });
    }

    const review = await Review.create({ attraction, visitor, score, comment });

    // Update attraction rating
    await exports.updateAttractionRating(attraction);

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get top-rated attractions
exports.getTopRatedAttractions = async (req, res) => {
  try {
    const topAttractions = await Attraction.find()
      .sort({ rating: -1 }) // Sort by highest rating
      .limit(5); // Get the top 5 attractions

    res.status(200).json(topAttractions);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve top-rated attractions" });
  }
};

// Get visitor activity
exports.getVisitorActivity = async (req, res) => {
  try {
    const visitors = await Visitor.find();

    const activity = await Promise.all(
      visitors.map(async (visitor) => {
        const reviewedCount = await Review.countDocuments({ visitor: visitor._id });
        return {
          name: visitor.name,
          email: visitor.email,
          reviewedAttractions: reviewedCount,
        };
      })
    );

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve visitor activity" });
  }
};
