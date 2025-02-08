const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;

//  router.get("/signup", userController.renderSignupForm);
//  (req, res) => {
//  res.render ("users/signup.ejs");
// });

//  router.post("/signup",wrapAsync(userController.signup));
// async(req,res)=>{
//     try{
//         let{username,email,password}=req.body;
//         const newUser = new User({email,username});
//          const registeredUser=await User.register(newUser,password);
//          console.log(registeredUser);
//          req.login(registeredUser,(err)=> {
//             if(err){
//                 return next(err);
//             }
//             req.flash("success","Welcome to Wanderlust!");
//             res.redirect("/listings");
//         });
//     }
//     catch(e){
//         req.flash("error",e.message);
//         res.redirect("/signup");
//     }
// }));

// //index-user
// router.get("/", (req, res) => {
//     res.send("i am user index");
// });

// //show-user
// router.get("//:id", (req, res) => {
//     res.send("i am user id");
// });

// //post-user
// router.post("/", (req, res) => {
//     res.send("i am user post");
// });

// //delete-user
// router.delete("//:id", (req, res) => {
//     res.send("i am user delete");
// });

// router.get("/login",userController.renderLoginForm);
// (req,res)=>{

//     res.render("users/login.ejs");
// }),

// router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}), userController.login);
// // async(
//     req,res)=>{
//     req.flash("success","welcome back!");
//     let redirectUrl=res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
// }
// );

// router.post("/login", saveRedirectUrl, passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
// }), async (req, res) => {
//     req.flash("success", "Welcome back!");
//     res.redirect(res.locals.redirectUrl);
//     // const redirectUrl = req.session.returnTo || "/listings/new"; // Use stored URL or fallback
//     // delete req.session.returnTo; // Clean up after redirect
//     // res.redirect(redirectUrl);
// });

// router.get("/logout", userController.logout);
//     (req,res,next)=>{
//     req.logout((err)=> {
//     if(err){
//       return next(err);
//     }
//     req.flash("success","logged out!");
//     res.redirect("/listings");

//     });
// });
