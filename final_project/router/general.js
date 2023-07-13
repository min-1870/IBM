const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  for (let ids of users){
    if (ids["username"] === username){
      return res.status(409).json({message: "The username is already exist"});
      break;
    }
  }
  const newUser = {username:username, password:password, token: ""} 
  users.push(newUser)
  return res.send(newUser)
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  new Promise((resolve, reject) => {
    resolve(books);
  })
  .then(result => {
    res.send(result);
  })
  .catch(error => {
    res.status(500).send('An error occurred');
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  new Promise((resolve, reject) => {
    const book = books[req.params.isbn] 
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
    resolve(book);
  })
  .then(result => {
    res.send(result);
  })
  .catch(error => {
    res.status(500).send('An error occurred');
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here


  new Promise((resolve, reject) => {
    
    const author = req.params.author
    const book = null

    for (const key in books) {
      if (books.hasOwnProperty(key)) {
        book = books[key];
        if (book.author === author) {
          break;
        }
      }
    }
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
    resolve(book);
  })
  .then(result => {
    res.send(result);
  })
  .catch(error => {
    res.status(500).send('An error occurred');
  });

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  
  new Promise((resolve, reject) => {
    const title = req.params.title
    const book = null
    for (const key in books) {
      if (books.hasOwnProperty(key)) {
        book = books[key];
        if (book.title === title) {
          break;
        }
      }
    }
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
    resolve(book);
  })
  .then(result => {
    res.send(result);
  })
  .catch(error => {
    res.status(500).send('An error occurred');
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn

  return res.send(books[isbn]['reviews'])
});

module.exports.general = public_users;
