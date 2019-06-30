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
import './App.css';

function App() {
  return (
   <Router>
     <div>
       <Switch>
         <Route exact path="/" component={PhotographerLanding} />
         <Route exact path="/pcategoryview/:category" component={PCategoryView} />
         <Route exact path="/pspecificpictureview/:id" component={PSpecificPictureView} />
         <Route exact path="/pviewphotographerprofile/:id" component={PViewPhotographerProlile} />
         <Route exact path="/purchasecart/:id" component={PurchaseCart} />
         <Route exact path="/purchaserlandingpage" component={PurchaserLandingPage} />
         <Route exact path="/checkout/:id" component={Checkout} />
         <Route exact path="/postpurchase/:id" component={PostPurchase} />
         <Route exact path="/mypurchases/:id" component={MyPurchases} />
         <Route exact path="/pviewphotographerphotos/:id" component={PViewPhotographerPhotos} />
         <Route exact path="/pyourphotos/:id" component={PYourPhotos} />
         <Route exact path="/purchasedphotoview/:id" component={PurchasedPhotoView} />
         <Route exact path="/photographerlanding/:id" component={PhotographerLanding} />
         <Route exact path="/photographermypictures/:id" component={PhotographerMyPictures} /> 
         <Route exact path="/photographerphotoview/:picId" component={PhotographerPhotoView} />
         <Route exact path="/photographersales/:id" component={PhotographerSales} />
       </Switch>
     </div>
   </Router>
  );
}

export default App;

