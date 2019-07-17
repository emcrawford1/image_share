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
  },

  //PostPurchase.js
  displayConf: userId => axios.get("/api/postpurchase/" + userId),

  //MyPurchases.js
  getPurchases: userId => axios.get("/api/mypurchases/" + userId),

  //PurchaserLandingPage.js
  loadCategories: () => axios.get("/api/categories"),

  //PCategoryView.js
  loadSpecificCategory: catId => axios.get("/api/specificcategoryview/" + catId),



  //PSpecificPictureView.js

  //Load picture
  loadSpecificPicture: picId => axios.get("/api/PSpecificPictureView/" + picId),

  //Check cart to see if user has already added to cart
  checkCart: (userId, picId) => axios.get("/api/PSpecificPictureView/cart/" + userId + "/" + picId),

  //Check to see if user has already purchased photo
  checkPurchases: (userId, picId) => axios.get("/api/PSpecificPictureView/purchases/" + userId + "/" + picId),

  //Add to cart
  addToCart: (userId, picId) => axios.post("/api/addtocart/" + userId + "/" + picId),


  //PYourPhotos.js

  //Get photos by confirmation number
  getByConf: confId => axios.get('/api/pyourphotosconf/' + confId),

  //Get photos by email
  getByEmail: userId => axios.get('/api/pyourphotosemail/' + userId),

  
  //PurchaseCart.js

  //Get cart items
  getPurchaseCart: userId => axios.get('/api/purchasecart/' + userId),

  //Delete one cart item
  removeFromCart: picId => axios.delete('/api/removeitem/' + picId),


  //PurchasedPhotoView.js
  displayPurchasedPhoto: (userId, picId) => axios.get("/api/purchasedphotoview/" + userId + "/" + picId),


  //PhotographerLanding.js
  getPhotographerProfile: (userId) => axios.get("/api/photographerlanding/" + userId),


  //PhotographerMyPictures.js
  getPhotographerPhotos: (userId) => axios.get('/api/photographermypictures/' + userId),


  //PhotographerPhotoView.js

  //Onload
  checkOwnPhoto: (picId) => axios.get('/api/photographerphotoview/' + picId),

  //Disable pic
  disablePhoto: (picId) => axios.put('/api/setdisable/' + picId),


  //PhotographerSales.js
  getSales: userId => axios.get('/api/photographersales/' + userId),


  //PViewPhotographerPhotos.js
  viewPhotographerPhotos: userId => axios.get('/api/pviewphotographerphotos/' + userId),

  //PviewPhotographerProfile.js
  viewPhotographerProfile: photographerId => axios.get('/api/pviewphotographerprofile/' + photographerId),

  //Register
  registerUser: userInfo => axios.post('/api/register', userInfo),

  
  //Login
  loginUser: userInfo => axios.post('/api/login', userInfo)


}

