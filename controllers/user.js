const User = require("../models/user");

const redirect_get_users = (req, res) => {
  console.log("we are here");
  User.find()
    .then((result) => {
      console.log("we are here2");

      //console.log(result);
      res.render("./user/index", { title: "Home User", users: result });
    })
    .catch((err) => {
      console.log("error on getting users3", err);
    });
};

const update_users = (req, res) => {
  console.log(req.body);
  console.log("data", req.body.id, req.body);
  User.findOneAndUpdate({_id:req.body.id}, req.body, (err, result) => {
    if (err) console.log("error on update user", err);
    else {
      console.log("user updated");
      res.redirect("/users");
    }
  });
};

const delete_users = (req, res) => {
  console.log(req.body);
  console.log("data", req.body.id);
  User.findOneAndDelete({ _id: req.body.id }, (err, result) => {
    if (err) console.log("error on delete user", err);
    else {
      console.log("user delete", result);
      res.redirect("/users");
    }
  });
};
const add_users = (req, res) => {
  const user = new User(req.body);
  
  user
    .save()
    .then((result) => {
      console.log("user added to system ..");
      res.redirect("/users");
    })
    .catch((err) => {
      console.log("error on saving user", err);
    });
};
const get_signup_users=(req,res)=>{
res.render('./user/signup',{message:''});
};
const post_signup_users = (req, res) => {
  console.log(req.body.name);
  if (
    !req.body.name ||
    !req.body.age ||
    !req.body.nationality ||
    !req.body.password
  ) {
    res.status("400");
    console.log("Invalid details to signup");
  } else {
    User.findOne({name:req.body.name})
    .then(result=>{
      if(result){
        console.log('User Already Exists! Login or choose another user name',result.name);
        res.render("./user/signup", {
          message: result.name+" Already Exists!"
        });
      }
      else{
        console.log(req.body);
        const user = new User(req.body);
        user
          .save()
          .then((result) => {
            console.log("user added to system ..");
            res.redirect("/users/login");
          })
          .catch((err) => {
            console.log("error on saving user",  err);
          });
      }
    })
    .catch(err=> console.log('error on finding user'));
    
  }
};

const get_protected_page=(req,res)=>{
res.render('./user/protected_page',{name:req.session.user.name});
};
const get_login_page=(req,res)=>{

  res.render('./user/login',{message:''});
};
const post_login_page=(req,res)=>{
console.log(req.body);
if(!req.body.name || !req.body.password){
  res.render('login', {message: "Please enter both id and password"});
} else {
User.findOne(req.body)
.then(result=>{
  console.log(result);
  if(result){
    req.session.user = result;
    res.redirect('/users/protected_page')
  }
  else{

    res.render('./user/login', {message: "Invalid credentials!"});
  }})
  .catch(err=>{console.log('error on finding user',err);
});
}
};
module.exports = {
  redirect_get_users,
  update_users,
  delete_users,
  add_users,
  get_signup_users,
  post_signup_users,
  get_protected_page,
  get_login_page,
  post_login_page

};
