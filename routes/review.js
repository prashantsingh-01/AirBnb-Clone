const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// const validateReview=(req,res,next)=>{
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//       let errmsg = error.details.map((el) => el.message).join(",");
//       throw new ExpressError(400, errmsg);
//     }
//     else{
//       next();
//     }
//   }

//post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);
// async (req, res) => {
//     let listing= await Listing.findById(req.params.id);
//     // console.log(listing);
//     // console.log(req.body);
//     let newReview = new Review(req.body.review);
//    newReview.author = req.user._id;
//     // console.log(newReview)
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();

//     // console.log("new review added");
//     // res.send("new review added");
//     req.flash("success", "  Review Added! ");
//     res.redirect(`/listings/${listing._id}`);

//     }));

//delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);
//   async (req, res) => {
//   let {id, reviewId} = req.params;
//   await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
//   await Review.findByIdAndDelete(reviewId);
//   req.flash("success", "  Review Deleted!");
//   res.redirect(`/listings/${id}`);
// }));

module.exports = router;
