let express = require("express");
let bodyParser = require("body-parser");

let PORT = process.env.PORT || 7777;

let app = express();

// Put HTML, CSS and client-side Javascript here
app.use(express.static("public"));

// be able to read the info that the body sends
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize handlebars
let exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes!
let routes = require("./controllers/burgersController.js");
app.use(routes);

// Let's go! Start the server!
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
