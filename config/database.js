import mongoose from "mongoose";
import bcrypt from "bcrypt";

//connexion à la base de données
mongoose.connect('mongodb://localhost:27017/db');

mongoose.connection.on("error", () => {
  console.log("Erreur lors de la connexion à la base de données");
});

mongoose.connection.on("open", () => {
  console.log("Connexion à la base de données établie");
});

// Article's schema
let ArticleSchema = mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: Date,
  comments:[{
    pseudo: String,
    comment: String,
    date: Date
  }],
  images: [{
    src: String,
    alt: String
  }]
});

let Article = mongoose.model("Article", ArticleSchema);


// Admin's schema
let AdminSchema = mongoose.Schema({
  email: String,
  password: String,
  pseudo: String
});
let Admin  = mongoose.model("Admin", AdminSchema);

bcrypt.hash("merci", 1, (err, result) =>{
let admin  = new Admin({
  email: "admin@admin.fr",
  password: result,
   pseudo: "toto"
   
  });
// console.log(result);
admin.save();
})

// User Schema
let UserSchema = mongoose.Schema({
  email: String,
  password: String,
  pseudo: String
});
let User  = mongoose.model("User", UserSchema);

export {Article, Admin, User};