let express = require("express");

let router = express.Router();

// Here's the burger-specific database functions
let burger = require("../models/burger.js");

// Route time!
// The route for the main page
router.get("/", function(req, res) {
  burger.all(function(data) {
    let allBurgers = {
      burgers: data
    };
    console.log(allBurgers);
    res.render("index", allBurgers);
  });
});

// Posting a new burger - it better be a pun
router.post("/api/burgers", function(req, res) {
  burger.create([
    "name", "eaten"
  ], [
    req.body.name, false //When a new burger is added, it's automatically not eaten yet
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

// Update burger to now be eaten
router.put("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  //console.log("condition", condition);

  burger.update({
    eaten: req.body.eaten
  }, condition, function(result) {
    // If anything was changed 
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Bye bye burger
router.delete("/api/burgers/:id", function(req, res) {
  let condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes
module.exports = router;
