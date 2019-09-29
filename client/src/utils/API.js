import axios from "axios";

export default {

  //Checkout.js
  getTotalCost: () => axios.get("/api/purchaserRoutes/checkout/"),

  getCartItems: () => axios.get("/api/purchaserRoutes/getpurchaseitems/"),

  placeOrder: () => axios.post("/api/purchaserRoutes/placeorder/"),

  makePurchase: cartItems => axios.post("/api/purchaserRoutes/purchasepost", cartItems),

  clearCart: () => axios.delete("/api/purchaserRoutes/clearcart/"),


  //PostPurchase.js
  displayConf: () => axios.get("/api/purchaserRoutes/postpurchase/"),

  //MyPurchases.js
  getPurchases: () => axios.get("/api/purchaserRoutes/mypurchases/"),

  //PurchaserLandingPage.js
  loadCategories: token => axios.get("/api/purchaserRoutes/categories", { headers: { Authorization: `Bearer ${token}`} }),

  //PCategoryView.js
  loadSpecificCategory: (token, catId) => axios.get("/api/purchaserRoutes/specificcategoryview/" + catId, { headers: { Authorization: `Bearer ${token}`}}),



  //PSpecificPictureView.js

  //Load picture
  loadSpecificPicture: (token, picId) => axios.get("/api/purchaserRoutes/PSpecificPictureView/" + picId, { headers: { Authorization: `Bearer ${token}`}}),

  //Check cart to see if user has already added to cart
  checkCart: (token, picId) => axios.get("/api/purchaserRoutes/PSpecificPictureView/cart/" + picId, { headers: { Authorization: `Bearer ${token}`}}),

  //Check to see if user has already purchased photo
  checkPurchases: (token, picId) => axios.get("/api/purchaserRoutes/PSpecificPictureView/purchases/" + picId, { headers: { Authorization: `Bearer ${token}`}}),

  //Add to cart
  addToCart: (token, picId) => axios.post("/api/purchaserRoutes/addtocart/", picId, { headers: { Authorization: `Bearer ${token}`}}),


  //PYourPhotos.js

  //Get photos by confirmation number
  getByConf: confId => axios.get('/api/purchaserRoutes/pyourphotosconf/' + confId),

  //Get photos by email
  getByEmail: () => axios.get('/api/purchaserRoutes/pyourphotosemail/'),

  
  //PurchaseCart.js

  //Get cart items
  getPurchaseCart: () => axios.get('/api/purchaserRoutes/purchasecart/'),

  //Delete one cart item
  removeFromCart: picId => axios.delete('/api/purchaserRoutes/removeitem/' + picId),


  //PurchasedPhotoView.js
  displayPurchasedPhoto: picId => axios.get("/api/purchaserRoutes/purchasedphotoview/" + picId),




  //PhotographerLanding.js
  getPhotographerProfile: (token) => axios.get("/api/photographerroutes/photographerlanding/", { headers: { Authorization: `Bearer ${token}`} }),


  //PhotographerMyPictures.js
  getPhotographerPhotos: (token) => axios.get('/api/photographerRoutes/photographermypictures/', { headers: { Authorization: `Bearer ${token}`} }),


  //PhotographerPhotoView.js

  //Onload
  checkOwnPhoto: picId => axios.get('/api/photographerRoutes/photographerphotoview/' + picId),

  //Disable pic
  disablePhoto: picId => axios.put('/api/photographerRoutes/setdisable/' + picId),


  //PhotographerSales.js
  getSales: token => axios.get('/api/photographerRoutes/photographersales/', { headers: { Authorization: `Bearer ${token}`} }),


  //PViewPhotographerPhotos.js
  viewPhotographerPhotos: () => axios.get('/api/purchaserRoutes/pviewphotographerphotos/'),

  //PviewPhotographerProfile.js
  viewPhotographerProfile: photographerId => axios.get('/api/purchaserRoutes/pviewphotographerprofile/' + photographerId),


  //Register
  registerUser: userInfo => axios.post('/api/register', userInfo),

  //Login
  loginUser: userInfo => axios.post('/api/login', userInfo),

  //Logout
  logoutUser: userInfo => axios.post('/api/authenticated/logout', userInfo),

  //photoAuthenticated.js
  getUser: token => axios.get('/api/authenticated/getUser', { headers: { Authorization: `Bearer ${token}`} })

}

