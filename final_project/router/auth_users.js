const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username: "root", password: "root", token: ""}, {username: "root1", password: "root1", token: ""}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  for (let user of users) {
    if (user.username === username) {
      return true;
      break;
    }
  }
  return false
}

const authenticatedUser = (username,password)=>{ //returns boolean
  //write code to check if username and password match the one we have in records.
  if(isValid(username)){
    for (let user of users){
      if(user.username === username || user.password === password){
        return true
      }
    }
  }
  return false
}

//only registered users can login
const secretKey = 'abcabcaaacbc';
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(authenticatedUser(username, password)){
    const token = jwt.sign({username: username, password: password}, secretKey);
    for (let user of users) {
      if(user.username === username){
        user.token = token
      }
    }
    return res.send(token)
  }
  return res.status(401).json({message: "Wrong username or password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Write your code here
  const username = req.body.username;
  const review = req.body.review;
  try {
    const book = books[req.params.isbn];
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.reviews[username] = review;
    console.log(book);
    res.status(200).json({message:"The reivew is created(updated)."});
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {

  const username = req.body.username;
  try {
    const book = books[req.params.isbn];
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    delete book.reviews[username];
    console.log(book);
    res.status(200).json({message:"The reivew is removed."});
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
