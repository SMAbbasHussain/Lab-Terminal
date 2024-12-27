This project is for an attraction-based platform, where visitors can explore various attractions and share their experiences.

Visitor Management: Visitors can register with their name and email. Each visitor has a list of attractions they've visited, which is used to keep track of their experiences.

Attraction Management: Attractions can be added with details like name, location, entry fee, and a rating system that reflects how well they're received by visitors.

Review System: Visitors can leave reviews for the attractions they've visited. Each review includes a score (1-5) and an optional comment. The system ensures that only visitors who have actually visited an attraction can leave a review, keeping the feedback genuine.

Rating Calculation: Once a review is submitted, the platform automatically updates the attraction's average rating based on all the reviews, allowing users to quickly spot the top-rated places.

Error Handling: The system is designed to ensure everything works smoothly, with built-in checks to prevent mistakes, like duplicate reviews or invalid inputs.

This project combines basic CRUD operations with smart logic to make sure only legitimate reviews are added, and attractions’ ratings are always up to date. It uses MongoDB and Mongoose to manage all the data behind the scenes.

Additinal Functionality: Someone who is no a user can't add a review.





