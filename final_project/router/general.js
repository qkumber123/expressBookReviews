const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(res.send(JSON.stringify(books,null,4)))
    },2000)});

    myPromise.then(() => {
      console.log("finished")
    })
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(res.send(books[isbn]))
    },2000)});

    myPromise.then(() => {
      console.log("finished")
    })
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      let bookArr = [];
      for (let key in books) {
        if (books[key].author == author) {
          bookArr.push(books[key]);
          resolve(res.send(bookArr))
        } else {
          resolve(res.send("No author found"))
        }
      }
      
    },2000)});

    myPromise.then(() => {
      console.log("finished")
    })
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {

      for (let key in books) {
        if (books[key].title == title) {
          resolve(res.send(books[key]))
        }
      }
      
    },2000)});

    myPromise.then(() => {
      console.log("finished")
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
