import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
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
import PhotographerAddPhoto from "./pages/PhotographerAddPhoto";
import Login from "./pages/Login";
import { getCookieJwt, removeCookieJwt } from "./helpers/jwt";
import Register from "./pages/Register";
import './App.css';


//Authentication Components
import { PurchaseAuthenticated, PhotoAuthenticated } from "./authWrappers/purchaseAuthenticated";
import API from "./utils/API";


class App extends Component {
  state = {
    email: null,
    accountType: null,
    jwt: null,
    loggedIn: false
  }

  //Get the web token (jwt) if the user has it.  If not, each of the components that are rendered will redirect the user back 
  //to the Login component (except for the Register component)
  componentDidMount() {

    //Get JWT from cookie
    const jwt = getCookieJwt();

    if (!jwt) {
      console.log("No Jwt")
    }

    else {
      API.getUser()
        .then(userData => {
          this.setState({
            email: userData.data.email,
            accountType: parseInt(userData.data.accountType),
            jwt,
            loggedIn: true
          });

        })
        
        //Console log errors and remove the Jwt from the cookie
        .catch(err => {
          console.log(err);
          console.log('Error state: ', this.state)
          // removeCookieJwt();
        })
    }
  }

  render() {
  
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <PurchaseAuthenticated exact path="/pcategoryview/:catId" accountType={this.state.accountType} component={PCategoryView} />
            <PurchaseAuthenticated exact path="/pspecificpictureview/:picId" accountType={this.state.accountType} component={PSpecificPictureView} />
            <PurchaseAuthenticated exact path="/pviewphotographerprofile/:photographerId" accountType={this.state.accountType} component={PViewPhotographerProlile} />
            <PurchaseAuthenticated exact path="/purchasecart" accountType={this.state.accountType} component={PurchaseCart} />
            <PurchaseAuthenticated exact path="/purchaserlandingpage" accountType={this.state.accountType} component={PurchaserLandingPage} />
            <PurchaseAuthenticated exact path="/checkout" accountType={this.state.accountType} component={Checkout} />
            <PurchaseAuthenticated exact path="/postpurchase/" accountType={this.state.accountType} component={PostPurchase} />
            <PurchaseAuthenticated exact path="/mypurchases" accountType={this.state.accountType} component={MyPurchases} />
            <PurchaseAuthenticated exact path="/pviewphotographerphotos/:photographerId" accountType={this.state.accountType} component={PViewPhotographerPhotos} />
            <PurchaseAuthenticated exact path="/pyourphotos/:confId" accountType={this.state.accountType} component={PYourPhotos} />
            <PurchaseAuthenticated exact path="/purchasedphotoview/:picId" accountType={this.state.accountType} component={PurchasedPhotoView} />
            <PhotoAuthenticated exact path="/photographerlandingpage" accountType={this.state.accountType} JWT={this.state.jwt} component={PhotographerLanding} />
            <PhotoAuthenticated exact path="/photographermypictures" accountType={this.state.accountType} component={PhotographerMyPictures} />
            <PhotoAuthenticated exact path="/photographerphotoview/:picId" accountType={this.state.accountType} component={PhotographerPhotoView} />
            <PhotoAuthenticated exact path="/photographersales/" accountType={this.state.accountType} component={PhotographerSales} />
            <PhotoAuthenticated exact path="/photographeraddphoto" accountType={this.state.accountType} component={PhotographerAddPhoto} />
          </Switch>
        </div>
      </Router>
    )
  }

}

export default App;


