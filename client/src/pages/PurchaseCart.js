import React, { Component } from "react";
import {PurchNav} from "../components/Nav";
import Footer from "../components/Footer";
import { ViewCart } from "../components/Card";
import { BtnSet } from "../components/Grid";
import { getJwt } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

//Styling
const cartContainer = {
  marginTop: "25px"
}

class PurchaseCart extends Component {

  state = {

    totalPrice: "",
    cartItems: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""

  };

//After component has mounted, the user's purchase cart will be obtained by passing the user's jwt to the getPurchaseCart 
//method.  
  componentDidMount() {
    this.setState({ jwt: getJwt() }, () => {
    API.getPurchaseCart(this.state.jwt)
      .then(cartData => {
        console.log(cartData)
        this.setState({ cartItems: cartData.data })
        this.getTotalPrice();
        this.setState({
          loading: false,
          isAuthenticated: true
        })
      })
      .catch(err => 
        {
          console.log(err);
          this.setState({
            loading: false,
            isAuthenticated: false
          })
        });

    console.log(this.state.totalPrice);
     })
  }

  //This function calculates the total price of the cart items.  
  getTotalPrice() {

    const priceArray = this.state.cartItems.map(item => parseInt(item.price));

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const newPrice = priceArray.reduce(reducer, 0);

    this.setState({ totalPrice: newPrice });
    console.log(this.state.totalPrice);
  }


  //Remove a single item from the cart
  removeFromCart(cartItem) {
    API.removeFromCart(cartItem, this.state.jwt)
    .then(cartData => {
      console.log(cartData);
      window.location.reload();
    })
    .catch(err => console.log(err))

  }

//Navigate the user to the next page
 nextPage() {
   let path = "/checkout";
   this.props.history.push(path)
 }

  //Testing - this will need to actually call one of the ORM functions above.
  clearCart() {
    API.clearCart(this.state.jwt)
    .then(cartData => {
      console.log(cartData);
      window.location.reload();
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
      return (
           <Redirect to='/' />
      )
    }
    if (this.state.cartItems.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav
            // id={this.state.userId}
          />
          <div className="container">
            <h2>There are no items in your cart.</h2>
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

        <div className="container" style={cartContainer}>

          {this.state.cartItems.map((item, index) =>
            <ViewCart
              key={item.cartId}
              title={item.title}
              fullName={item.userName}
              price={item.price}
              image={item.filePath}
              onClick={() => this.removeFromCart(item.cartId)}
            />

          )}
          <BtnSet
            totalPrice={"Total Cost: $" + this.state.totalPrice} 
            clearCart={() => this.clearCart()}
            nextPage={() => this.nextPage()} />
        </div>
        <Footer />
      </div>
    )
  }
}
export default PurchaseCart;



