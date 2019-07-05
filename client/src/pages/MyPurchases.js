import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PostPurchaseGrid, MyPurchasesGrid } from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class MyPurchases extends Component {

  state = {
    userId: this.props.match.params.userId,

    purchases: [{
      confirmationNumber: "31",
      date: "March 3, 2019",
      totalPrice: "45"
    }],


  };

  //This needs to be uncommented when ORM is set up
  componentWillMount() {
    API.getPurchases(this.state.userId)
    .then(purchData => { 
      console.log(purchData)
      this.setState({ purchases: purchData.data})
    })
      // .then(purchData => this.setState({pictures: purchData.data}))
      .catch(err => console.log(err));
  }

  render() {

    if (this.state.purchases.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav
            id={this.state.userId}
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
          id={this.state.userId}
        />
        <div className="container" >
          <h1>Your Purchases:</h1>
          {this.state.purchases.map( (purchase, index) => (
            <MyPurchasesGrid
             
              key={index}
              confirmationNumber={"Confirmation Number: " + purchase.confirmationNumber}
              date={"Purchase Date: " + purchase.date}
              link={"/pyourphotos/" + this.state.userId +"/" + purchase.confirmationNumber}
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

