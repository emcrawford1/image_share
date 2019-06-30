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
    userId: this.props.match.params.id,

    cartItems: [
      {
        purchaserId: "10",
        pictureId: "32",
        title: "Just a Beautiful Photograph",
        firstName: "Wanda",
        lastName: "Denkins",
        price: "40",
        filePath: "/images/picture5.jpg",
      },

      {
        purchaserId: "11",
        pictureId: "33",
        title: "Inspiring",
        firstName: "George",
        lastName: "Thormul",
        price: "4103",
        filePath: "/images/picture5.jpg",
      },

      {
        purchaserId: "12",
        pictureId: "34",
        title: "You've Got an Error",
        firstName: "Percy",
        lastName: "Moravin",
        price: "404",
        filePath: "/images/picture8.jpg",
      },

      {
        purchaserId: "13",
        pictureId: "35",
        title: "Leet",
        firstName: "m3lvIn",
        lastName: "t03h@7g@r",
        price: "1337",
        filePath: "/images/picture5.jpg",
      }
    ]

  };

  componentWillMount() {
    this.getTotalPrice();
    console.log(this.state.totalPrice);
  }

  getTotalPrice() {

    const priceArray = this.state.cartItems.map(item => parseInt(item.price));

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const newPrice = priceArray.reduce(reducer, 0);

    this.setState({ totalPrice: newPrice });
    console.log(this.state.totalPrice);
  }
  //This needs to be uncommented when ORM is set up.  This is probably going to need more ORM logic to call
  //the database for each picture in the user's cart.  May need to try to set up an index
  // componentWillMount() {
  //   API.getCartItems(this.props.match.params.id)
  //     .then(res => this.setState({pictures: res.data, searchValue: "" }))
  //     .catch(err => console.log(err));
  // }

  //This needs to be uncommented when the ORM is set up
  // addToCart(picId, purchaserId) {
  //   API.addToCart(picId, purchaserId)
  //   .then(this.setState({disabled: true}))
  //   .catch(err => console.log(err));
  // }

  //Testing - This will actually need to call the ORM with the 
  removeFromCart(index) {

    console.log("Removing: " + this.state.cartItems[index]);

    let newCart = this.state.cartItems;
    newCart.splice(index, 1);
    this.setState({ cartItems: newCart });
    this.getTotalPrice();

  }

 nextPage() {
   let path = "/checkout/" + this.state.userId;
   this.props.history.push(path)
 }
  //Testing - this will need to actually call one of the ORM functions above.
  clearCart() {
    //Clear the whole thing.

    const newthing =  [{
      purchaserId: "13",
      pictureId: "35",
      title: "Leet",
      firstName: "m3lvIn",
      lastName: "t03h@7g@r",
      price: "1337",
      filePath: "/images/picture5.jpg",
    }]
    this.setState({ cartItems: []})
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
              key={index}
              title={item.title}
              fullName={item.firstName + " " + item.lastName}
              price={item.price}
              image={item.filePath}
              onClick={() => this.removeFromCart(index)}
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



