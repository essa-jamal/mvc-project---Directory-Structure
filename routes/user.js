//All routes for different entities in different files 
const express = require("express");
const route = express.Router();
const userControl = require("../controllers/user");

route.get("/", userControl.redirect_get_users);

route.post("/update", userControl.update_users);
route.post("/delete", userControl.delete_users);
route.post("/add", userControl.add_users);
route.get('/signup',userControl.get_signup_users)
route.post('/signup',userControl.post_signup_users)
route.get('/protected_page',userControl.get_protected_page);
route.get('/login',userControl.get_login_page);
route.post('/login',userControl.post_login_page);
module.exports = route;
