import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();

//appel de mes controllers
import HomeController from "../controllers/home.js"
import {AddComment, Details} from "../controllers/details.js"
import { AddPost, AddPostSubmit, Admin, DeletePost, EditPost, EditPostSubmit } from "../controllers/admin.js";
import { Login, LoginSubmit, Logout } from "../controllers/login.js";
import {User} from '../config/database.js'
import { UserInterface } from "../controllers/user.js";
import { Register } from "../controllers/register.js";

// ADMIN PAGE
router.get('/admin', Admin);
router.get('/user', UserInterface);

// ADD POST
router.get('/add_post', AddPost);

// ADD POST SUBMIT
router.post('/add_post', AddPostSubmit);

// DELETE POST 
router.get('/delete_post/:id', DeletePost);

// EDIT POST
router.get("/edit_post/:id", EditPost);

// EDIT POST SUBMIT
router.post('/edit_post/:id', EditPostSubmit);

// HOME PAGE
router.get("/", HomeController);

// DETAIL PAGE
router.get('/article/:id', Details);

// ADD COMMENTS
router.post("/add_comment/:id", AddComment);
// --------------------------------------

// AUTHENTIFICATION
router.get("/login", Login);
router.get('/register', Register);

// AUTHENTIFICATION SUBMIT
router.post("/login",LoginSubmit);

router.post("/register", (req,_) =>{
    bcrypt.hash(req.body.password, 1, (_, result) =>{
      let user  = new User({
        email: req.body.email,
        password: result,
        pseudo: req.body.pseudo
      });
      user.save(console.log(`User ${user.pseudo} added`));
    });
  });

// DECONNEXION
router.get("/logout", Logout);

export default router;