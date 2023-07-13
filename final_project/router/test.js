
let books = require("./booksdb.js");

for (const key in books) {
    if (books.hasOwnProperty(key)) {
      const book = books[key];
      if (book.title === "The Epic Of Gilgamesh") {
        console.log(book)
        break;
      }
    }
  }
