import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { MyPurchasesGrid } from "../components/Grid";
import API from "../utils/API";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";


class MyPurchases extends Component {

  state = {
    purchases: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  
  componentDidMount() {

    API.getPurchases()
      .then(purchData => {

        //Map over array of objects and format date
        let purchaseData = purchData.data.purchases.map(data => {

          let purchDate = new Date(data.date);

          return {
            confirmationNumber: data.confirmationNumber,
            date: `${purchDate.toDateString()} - ${purchDate.toLocaleTimeString()}`,
            totalPrice: data.totalPrice
          }
        })

        setCookie(purchData.data.token);
       
        this.setState({
          purchases: purchaseData,
          loading: false,
          isAuthenticated: true
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false,
          isAuthenticated: false
        })
      });
  }

  render() {

    if (this.state.loading === true && this.state.isAuthenticated === false) {
      return (
        <NoItems
          message="Loading...."
        />
      )
    }

    if (this.state.loading === false && this.state.isAuthenticated === false) {
      removeCookieJwt()
      return (
        <Redirect to='/' />
      )
    }
    if (this.state.purchases.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav/>
          <div className="container">
            <h2>You have not made any purchases.</h2>
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className="wrapper">
        <PurchNav/>
        <div className="container" >
          <h1>Your Purchases:</h1>
          {this.state.purchases.map((purchase, index) => (
            <MyPurchasesGrid
              key={index}
              confirmationNumber={"Confirmation Number: " + purchase.confirmationNumber}
              date={"Purchase Date: " + purchase.date}
              link={"/pyourphotos/" + purchase.confirmationNumber}
              totalPrice={"Total price: $" + purchase.totalPrice}
            />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}

export default MyPurchases;

