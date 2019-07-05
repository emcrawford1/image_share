import React, { Component } from "react";
import {PurchNav} from "../components/Nav";
import Footer from "../components/Footer";
import { ViewCart } from "../components/Card";
import { BtnSet } from "../components/Grid";
import API from "../utils/API";

//Styling

const cartContainer = {
  marginTop: "25px"
}

class PurchaseCart extends Component {

  state = {

    totalPrice: "",
    userId: this.props.match.params.userId,

    cartItems: []

  };

  componentWillMount() {
    API.getPurchaseCart(this.state.userId)
      .then(cartData => {
        console.log(cartData)
        this.setState({ cartItems: cartData.data })
        this.getTotalPrice();
      })
      .catch(err => console.log(err));

    console.log(this.state.totalPrice);
  }

  getTotalPrice() {

    const priceArray = this.state.cartItems.map(item => parseInt(item.price));

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const newPrice = priceArray.reduce(reducer, 0);

    this.setState({ totalPrice: newPrice });
    console.log(this.state.totalPrice);
  }

  

  //Testing - This will actually need to call the ORM with the 
  removeFromCart(cartItem) {
    API.removeFromCart(cartItem)
    .then(cartData => {
      console.log(cartData);
      window.location.reload();
    })
    .catch(err => console.log(err))

  }

 nextPage() {
   let path = "/checkout/" + this.state.userId;
   this.props.history.push(path)
 }

  //Testing - this will need to actually call one of the ORM functions above.
  clearCart() {
    API.clearCart(this.state.userId)
    .then(cartData => {
      console.log(cartData);
      window.location.reload();
    })
    .catch(err => console.log(err))
  }

  render() {

    if (this.state.cartItems.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav
            id={this.state.userId}
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
          id={this.state.userId}
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



