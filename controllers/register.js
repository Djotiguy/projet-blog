import { User } from "../config/database.js";
import bcrypt from "bcrypt"

export const Register = (req, res) =>{
    res.render("layout", {template: "register"})
}

export const RegisterSubmit = (req, res) => {
    bcrypt.hash(req.body.pwd, 1, (res, result) =>{
        let user  = new User({
          email: req.body.email,
          password: result,
          pseudo: req.body.pseudo
        });
        res.redirect("/");
        res.render("layout", {template: "home", message:"Compte crée"})    
        user.save(console.log(`User ${user.pseudo} added`));
    });

}

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
}