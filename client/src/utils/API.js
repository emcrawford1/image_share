import axios from "axios";

export default {

  //Checkout.js
  getTotalCost: userId => axios.get("/api/purchaserRoutes/checkout/" + userId),

  getCartItems: userId => axios.get("/api/purchaserRoutes/getpurchaseitems/" + userId),

  placeOrder: userId => axios.post("/api/purchaserRoutes/placeorder/" + userId),

  makePurchase: cartItems => axios.post("/api/purchaserRoutes/purchasepost", cartItems),

  clearCart: userId => axios.delete("/api/purchaserRoutes/clearcart/" + userId),


  //PostPurchase.js
  displayConf: userId => axios.get("/api/purchaserRoutes/postpurchase/" + userId),

  //MyPurchases.js
  getPurchases: userId => axios.get("/api/purchaserRoutes/mypurchases/" + userId),

  //PurchaserLandingPage.js
  loadCategories: () => axios.get("/api/purchaserRoutes/categories"),

  //PCategoryView.js
  loadSpecificCategory: catId => axios.get("/api/purchaserRoutes/specificcategoryview/" + catId),



  //PSpecificPictureView.js

  //Load picture
  loadSpecificPicture: picId => axios.get("/api/purchaserRoutes/PSpecificPictureView/" + picId),

  //Check cart to see if user has already added to cart
  checkCart: (userId, picId) => axios.get("/api/purchaserRoutes/PSpecificPictureView/cart/" + userId + "/" + picId),

  //Check to see if user has already purchased photo
  checkPurchases: (userId, picId) => axios.get("/api/purchaserRoutes/PSpecificPictureView/purchases/" + userId + "/" + picId),

  //Add to cart
  addToCart: (userId, picId) => axios.post("/api/purchaserRoutes/addtocart/" + userId + "/" + picId),


  //PYourPhotos.js

  //Get photos by confirmation number
  getByConf: confId => axios.get('/api/purchaserRoutes/pyourphotosconf/' + confId),

  //Get photos by email
  getByEmail: userId => axios.get('/api/purchaserRoutes/pyourphotosemail/' + userId),

  
  //PurchaseCart.js

  //Get cart items
  getPurchaseCart: userId => axios.get('/api/purchaserRoutes/purchasecart/' + userId),

  //Delete one cart item
  removeFromCart: picId => axios.delete('/api/purchaserRoutes/removeitem/' + picId),


  //PurchasedPhotoView.js
  displayPurchasedPhoto: (userId, picId) => axios.get("/api/purchaserRoutes/purchasedphotoview/" + userId + "/" + picId),




  //PhotographerLanding.js
  getPhotographerProfile: (userId) => axios.get("/api/photographerRoutes/photographerlanding/" + userId),


  //PhotographerMyPictures.js
  getPhotographerPhotos: (userId) => axios.get('/api/photographerRoutes/photographermypictures/' + userId),


  //PhotographerPhotoView.js

  //Onload
  checkOwnPhoto: (picId) => axios.get('/api/photographerRoutes/photographerphotoview/' + picId),

  //Disable pic
  disablePhoto: (picId) => axios.put('/api/photographerRoutes/setdisable/' + picId),


  //PhotographerSales.js
  getSales: userId => axios.get('/api/photographerRoutes/photographersales/' + userId),


  //PViewPhotographerPhotos.js
  viewPhotographerPhotos: userId => axios.get('/api/purchaserRoutes/pviewphotographerphotos/' + userId),

  //PviewPhotographerProfile.js
  viewPhotographerProfile: photographerId => axios.get('/api/purchaserRoutes/pviewphotographerprofile/' + photographerId),


  //Register
  registerUser: userInfo => axios.post('/api/register', userInfo),

  //Login
  loginUser: userInfo => axios.post('/api/login', userInfo),

  //Logout
  logoutUser: userInfo => axios.post('/api/authenticated/logout', userInfo)
}

