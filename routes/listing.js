const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isowner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// .post(upload.single('listing[image]'), (req, res) => {
//   res.send(req.file);
// });

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isowner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isowner, wrapAsync(listingController.destroyListing));

//Index Route
// router.get("/", wrapAsync( listingController.index));

// //New Route
// router.get("/new", isLoggedIn, listingController.renderNewForm);
//  (req, res) => {
//   res.render("listings/new.ejs");
// });

//Show Route
// router.get("/:id", wrapAsync(listingController.showListing));
//   (async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id).populate({
//     path: "reviews",
//     populate: {
//       path:"author",
//     },
//   })
//   .populate("owner");
//   if(!listing){
//     req.flash("error", "Cannot find listing!");
//     return res.redirect("/listings");
//   }
//    console.log(listing);
//   res.render("listings/show.ejs", { listing });
// }));

//Create Route
// router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListing));
//   (async (req, res ,next) => {
//   //  if(!req.body.listing){
//   //    throw new ExpressError(400, "send valid listing data");
// // }
//  let result=listingSchema.validate(req.body);
//  console.log(result);
//  if(result.error){
//   throw new ExpressError(400, error);
//  }
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//   await newListing.save();
//   req.flash("success", "Listing Created!");
//   // console.log(newListing);
//   res.redirect("/listings");
//   }

// ));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isowner,
  wrapAsync(listingController.renderEditForm)
);
//   ( async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   if(!listing){
//     req.flash("error", "Cannot find listing!");
//     return res.redirect("/listings");
//   }
//   res.render("listings/edit.ejs", { listing });
// }));

//Update Route
// router.put("/:id",isLoggedIn,isowner,validateListing, wrapAsync(listingController.updateListing));
//   async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   req.flash("success", "  Listing Updated! ");
//   res.redirect(`/listings/${id}`);
// }));

//Delete Route
// router.delete("/:id",isLoggedIn,isowner,wrapAsync(listingController.destroyListing));
// ( async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   req.flash("success", " Listing Deleted!  ");
//   res.redirect("/listings");
// }));

module.exports = router;
