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
    userId: "10",
    totalPrice: "75.00",
    searchVal: ""
  };

  //This will need to get the total price of the user's orders and update the totalPrice property
  // componentWillMount() {
  //   API.getPictures(this.props.match.params.userId)
  //     .then(res => this.setState({pictures: res.data, searchValue: "" }))
  //     .catch(err => console.log(err));
  // }


 nextPage() {
  let path = "/postpurchase/" + this.state.userId;
  this.props.history.push(path);
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