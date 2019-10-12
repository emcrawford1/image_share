import axios from "axios";

export default {

  //Checkout.js
  getTotalCost: (token) => axios.get("/api/purchaserRoutes/checkout/", { headers: { Authorization: `Bearer ${token}`}}),

  getCartItems: (token) => axios.get("/api/purchaserRoutes/getpurchaseitems/", { headers: { Authorization: `Bearer ${token}`}}),

  placeOrder: (order, token) => axios.post("/api/purchaserRoutes/placeorder/", order, { headers: { Authorization: `Bearer ${token}`}}),

  makePurchase: (cartItems, token) => axios.post("/api/purchaserRoutes/purchasepost", cartItems, { headers: { Authorization: `Bearer ${token}`}}),

  clearCart: (token) => axios.delete("/api/purchaserRoutes/clearcart/", { headers: { Authorization: `Bearer ${token}`}}),


  //PostPurchase.js
  displayConf: (token) => axios.get("/api/purchaserRoutes/postpurchase/", { headers: { Authorization: `Bearer ${token}`}}),

  //MyPurchases.js
  getPurchases: (token) => axios.get("/api/purchaserRoutes/mypurchases/", { headers: { Authorization: `Bearer ${token}`}}),

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
  getByConf: (confId, token) => axios.get('/api/purchaserRoutes/pyourphotosconf/' + confId, {headers: { Authorization: `Bearer ${token}`}}),

  //Get photos by email
  getByEmail: (token) => axios.get('/api/purchaserRoutes/pyourphotosemail/', { headers: { Authorization: `Bearer ${token}`}}),

  
  //PurchaseCart.js

  //Get cart items
  getPurchaseCart: (token) => axios.get('/api/purchaserRoutes/purchasecart/', { headers: { Authorization: `Bearer ${token}`}}),

  //Delete one cart item
  removeFromCart: (picId, token) => axios.delete('/api/purchaserRoutes/removeitem/' + picId, { headers: { Authorization: `Bearer ${token}`}}),


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

