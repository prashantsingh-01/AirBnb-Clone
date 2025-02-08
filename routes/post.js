const express = require("express");
const router = express.Router();

//index
router.get("/", (req, res) => {
  res.send("i am posts index");
});

//show
router.get("/:id", (req, res) => {
  res.send("i am posts id");
});

//post
router.post("/", (req, res) => {
  res.send("i am posts");
});

//delete
router.delete("/:id", (req, res) => {
  res.send("i am posts delete");
});

module.exports = router;
