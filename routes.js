//Require all routes in this and then require this file in
const express = require("express");
const route = express.Router();

const userRoute = require("./routes/user");


route.get("/", (req, res) => {
    //  console.log('cookieAge: 404',cookies);
    if (req.session.page_views) {
      req.session.page_views++;
      console.log("you visited this page", req.session.page_views, "times");
    } else {
      req.session.page_views = 1;
      console.log("welcome to our page");
    }
    res
      .cookie("name", "testUser")
      .cookie("age2", "32", { maxAge: 3600 })
      .render("index", { title: "Home" });
  });
  
  route.get("/cookie/reset", (req, res) => {
    console.log("before ", req.cookies);
  
    res.clearCookie("cookieAge");
    res.redirect("/");
    console.log("after ", req.cookies);
  });
  route.get("/cookie/create", (req, res) => {
    res.cookie("name2", "test", { maxAge: 300 }).redirect("/");
  });
  route.get('/logout', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.redirect('/users/login');
 });
  
  route.use("/users", userRoute);
  
  route.use((req, res) => {
    console.log("cookie: 404", req.cookies["name"]);
    res
      .cookie("cookieAgea", "3000", { expire: 3000 + Date.now() })
      .render("./404");
  });
  module.exports = route;