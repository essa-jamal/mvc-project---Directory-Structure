const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const route = require("./routes");

mongoose
  .connect("mongodb://localhost/myDB")
  .then((result) => {
    console.log("Server Connected to database");
    app.listen(3000, () => {
      console.log("...Server is listening to port 3000");
    });
  })
  .catch((err) => {
    console.log("unable to connect to database");
  });
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(session({ secret: "Shh, it is a secret" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(route);
