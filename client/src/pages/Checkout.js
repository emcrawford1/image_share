import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { CheckoutForm } from "../components/Form";
import API from "../utils/API";
import { setCookie, removeCookieJwt } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PCategoryView extends Component {

  state = {
    userId: this.props.match.params.userId,
    totalPrice: "0",
    purchaseConfirmation: "10",
    cartItems: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  }


  componentDidMount() {
    API.getTotalCost()
      .then(cost => {
        this.setState({ totalPrice: cost.data.totalPrice })
        setCookie(cost.data.token)
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false,
          isAuthenticated: false
        })
      });
    API.getCartItems()
      .then(cart => {
        this.setState({
          cartItems: cart.data,
          loading: false,
          isAuthenticated: true
        })
        console.log(cart)
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false,
          isAuthenticated: false
        })
      })
  }


  //Post new entry in the purchase_confirmations and purchases table, clear the cart, and 
  //send user to next page
  nextPage() {
    let path = "/postpurchase";
    let orderObj = {};

    API.placeOrder(orderObj)
      .then(orderData => {
        API.clearCart()
          .then(status => {
            this.props.history.push(path);
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
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
      removeCookieJwt();
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div className="wrapper">
        <PurchNav
          id={this.state.userId}
        />
        <div style={flexContainer}>

          <CheckoutForm
            totalPrice={"Total Price: $" + this.state.totalPrice}
            nextPage={() => this.nextPage()}
          />

        </div>
        <Footer />
      </div>
    )
  }
}

export default PCategoryView;