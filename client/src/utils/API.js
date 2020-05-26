import axios from "axios";

export default {

  //Checkout.js
  getTotalCost: () => axios.get("/api/purchaserRoutes/checkout/"),

  getCartItems: () => axios.get("/api/purchaserRoutes/getpurchaseitems/"),

  placeOrder: order => axios.post("/api/purchaserRoutes/placeorder/", order),

  makePurchase: (cartItems, token) => axios.post("/api/purchaserRoutes/purchasepost", cartItems, { headers: { Authorization: `Bearer ${token}`}}),

  clearCart: () => axios.delete("/api/purchaserRoutes/clearcart/" ),


  //PostPurchase.js
  displayConf: () => axios.get("/api/purchaserRoutes/postpurchase/"),

  //MyPurchases.js
  getPurchases: () => axios.get("/api/purchaserRoutes/mypurchases/"),

  //PurchaserLandingPage.js
  loadCategories: () => axios.get("/api/purchaserRoutes/categories" ),

  //PCategoryView.js
  loadSpecificCategory: (catId) => axios.get("/api/purchaserRoutes/specificcategoryview/" + catId),



  //PSpecificPictureView.js

  //Load picture
  loadSpecificPicture: picId => axios.get("/api/purchaserRoutes/PSpecificPictureView/" + picId),

  //Check cart to see if user has already added to cart
  checkCart: picId => axios.get("/api/purchaserRoutes/PSpecificPictureView/cart/" + picId),

  //Check to see if user has already purchased photo
  checkPurchases: picId => axios.get("/api/purchaserRoutes/PSpecificPictureView/purchases/" + picId),

  //Add to cart
  addToCart: picId => axios.post("/api/purchaserRoutes/addtocart/", picId),


  //PYourPhotos.js

  //Get photos by confirmation number
  getByConf: confId => axios.get('/api/purchaserRoutes/pyourphotosconf/' + confId ),

  //Get photos by email
  getByEmail: () => axios.get('/api/purchaserRoutes/pyourphotosemail/'),

  
  //PurchaseCart.js

  //Get cart items
  getPurchaseCart: () => axios.get('/api/purchaserRoutes/purchasecart/'),

  //Delete one cart item
  removeFromCart: picId => axios.delete('/api/purchaserRoutes/removeitem/' + picId ),


  //PurchasedPhotoView.js
  displayPurchasedPhoto: picId => axios.get("/api/purchaserRoutes/purchasedphotoview/" + picId ),




  //PhotographerLanding.js
  getPhotographerProfile: () => axios.get("/api/photographerroutes/photographerlanding/"),


  //PhotographerMyPictures.js
  getPhotographerPhotos: () => axios.get('/api/photographerRoutes/photographermypictures/'),


  //PhotographerPhotoView.js

  //Onload
  checkOwnPhoto: picId => axios.get('/api/photographerRoutes/photographerphotoview/' + picId),

  //Disable pic
  disablePhoto: picId => axios.put('/api/photographerRoutes/setdisable/' + picId, {}),


  //PhotographerSales.js
  getSales: () => axios.get('/api/photographerRoutes/photographersales/'),


  //PViewPhotographerPhotos.js
  viewPhotographerPhotos: photographerId => axios.get('/api/purchaserRoutes/pviewphotographerphotos/' + photographerId ),

  //PviewPhotographerProfile.js
  viewPhotographerProfile: photographerId => axios.get('/api/purchaserRoutes/pviewphotographerprofile/' + photographerId ),


  //Register
  registerUser: userInfo => axios.post('/api/register', userInfo),

  //Login
  loginUser: userInfo => axios.post('/api/login', userInfo),

  //Logout
  logoutUser: userInfo => axios.post('/api/authenticated/logout', userInfo),

  //photoAuthenticated.js
  getUser: () => axios.get('/api/authenticated/getUser'),


 
  getCategories: () => axios.get('/api/photographerRoutes/getCategories'),

  uploadPhoto: imageInfo => axios.post('/api/photographerRoutes/uploads/', imageInfo),

  uploadProfilePic: imageInfo => axios.post('/api/photographerRoutes/profileUploads/', imageInfo)
}

