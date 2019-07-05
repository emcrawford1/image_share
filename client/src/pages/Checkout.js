import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { CheckoutForm } from "../components/Form";
import API from "../utils/API";

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
    cartItems: []
  }


  componentWillMount() {
    API.getTotalCost(this.state.userId)
      .then(cost =>
        this.setState({ totalPrice: cost.data.totalPrice, userId: this.props.match.params.id }))
      .catch(err => console.log(err));
    API.getCartItems(this.state.userId)
      .then(cart => {
        this.setState({ cartItems: cart.data })
        console.log(this.state)
      })
      .catch(err => console.log(err))
  }


  //Post new entry in the purchase_confirmations and purchases table, clear the cart, and 
  //send user to next page
  nextPage() {
    let path = "/postpurchase/" + this.state.userId;
    let tempCart = this.state.cartItems;

    API.placeOrder(this.state.userId)
      .then(orderData => {
        
        let Cart = tempCart.map(item => {
          return {
            priceAtPurchase: item.priceAtPurchase,
            pictureId: item.pictureId,
            userEmail: item.userEmail,
            photographerEmail: item.photographerEmail,
            purchaseConfirmationId: orderData.data.id
          }
        })

        API.makePurchase(Cart)
          .then(purchData => {
            console.log(purchData)

            API.clearCart(this.state.userId)
              .then(status => {
                console.log(status);
                this.props.history.push(path);
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
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