import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PostPurchaseGrid, MyPurchasesGrid } from "../components/Grid";
import API from "../utils/API";
import { getJwt, removeJwt } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class MyPurchases extends Component {

  state = {
    purchases: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  //This needs to be uncommented when ORM is set up
  componentDidMount() {
    this.setState({ jwt: getJwt() }, () => {
    API.getPurchases(this.state.jwt)
    .then(purchData => { 
      console.log(purchData)
      this.setState({ 
        purchases: purchData.data,
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
    })
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
      removeJwt()
      return (
           <Redirect to='/' />
      )
    }
    if (this.state.purchases.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav
            // id={this.state.userId}
          />
          <div className="container">
            <h2>You have not made any purchases.</h2>
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className="wrapper">
        <PurchNav
          // id={this.state.userId}
        />
        <div className="container" >
          <h1>Your Purchases:</h1>
          {this.state.purchases.map( (purchase, index) => (
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

