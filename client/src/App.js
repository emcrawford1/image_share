import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PurchaserLandingPage from "./pages/PurchaserLandingPage";
import PCategoryView from "./pages/PCategoryView";
import PSpecificPictureView from "./pages/PSpecificPictureView";
import PViewPhotographerProlile from "./pages/PViewPhotographerProfile";
import PurchaseCart from "./pages/PurchaseCart";
import Checkout from "./pages/Checkout";
import PostPurchase from "./pages/PostPurchase";
import MyPurchases from "./pages/MyPurchases";
import PViewPhotographerPhotos from "./pages/PViewPhotographerPhotos";
import PYourPhotos from "./pages/PYourPhotos";
import PurchasedPhotoView from "./pages/PurchasedPhotoView";
import PhotographerLanding from "./pages/PhotographerLanding";
import PhotographerMyPictures from "./pages/PhotographerMyPictures";
import PhotographerPhotoView from "./pages/PhotographerPhotoView";
import PhotographerSales from "./pages/PhotographerSales";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './App.css';

function App() {
  return (
   <Router>
     <div>
       <Switch>
         <Route exact path="/" component={Login} />
         <Route exact path="/register" component={Register} />
         <Route exact path="/pcategoryview/:userId/:catId" component={PCategoryView} />
         <Route exact path="/pspecificpictureview/:userId/:picId" component={PSpecificPictureView} />
         <Route exact path="/pviewphotographerprofile/:userId/:photographerId" component={PViewPhotographerProlile} />
         <Route exact path="/purchasecart/:userId" component={PurchaseCart} />
         <Route exact path="/purchaserlandingpage/:userId" component={PurchaserLandingPage} />
         <Route exact path="/checkout/:userId" component={Checkout} />
         <Route exact path="/postpurchase/:userId" component={PostPurchase} />
         <Route exact path="/mypurchases/:userId" component={MyPurchases} />
         <Route exact path="/pviewphotographerphotos/:userId" component={PViewPhotographerPhotos} />
         <Route exact path="/pyourphotos/:userId/:confId" component={PYourPhotos} />
         <Route exact path="/purchasedphotoview/:userId/:picId" component={PurchasedPhotoView} />
         <Route exact path="/photographerlanding/:userId" component={PhotographerLanding} />
         <Route exact path="/photographermypictures/:userId" component={PhotographerMyPictures} /> 
         <Route exact path="/photographerphotoview/:userId/:picId" component={PhotographerPhotoView} />
         <Route exact path="/photographersales/:userId" component={PhotographerSales} />
       </Switch>
     </div>
   </Router>
  );
}

export default App;

