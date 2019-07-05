import axios from "axios";

export default {

  //Checkout.js
  getTotalCost: function(userId) {
    return axios.get("/api/checkout/" + userId);
  },

  getCartItems: function(userId) {
    return axios.get("/api/getpurchaseitems/" + userId);
  },

  placeOrder: function(userId) {
    return axios.post("/api/placeorder/" + userId)
  },

  makePurchase: function(cartItems) {
    return axios.post("/api/purchasepost", cartItems)
  },

  clearCart: function(userId) {
    return axios.delete("/api/clearcart/" + userId)
  }
}


// import axios from "axios";

// export default {
//   // Gets all books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
// };
