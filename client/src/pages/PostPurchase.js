import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PostPurchaseGrid } from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PostPurchase extends Component {

  state = {
    userId: this.props.match.params.userId,
    firstName: "Danithon",
    confirmationNumber: "34",
   
  };

  // This needs to be uncommented when ORM is set up
  componentWillMount() {
    API.displayConf(this.state.userId)
      .then(confData => this.setState(confData.data[0]))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="wrapper">
        <PurchNav 
          id={this.state.userId}
        />
        <div className="container" style={flexContainer}>
          <PostPurchaseGrid
            thankYouMessage={this.state.firstName + ", thank you for your purchase!"}
            confirmationNumber={"Your confirmation number is: " + this.state.confirmationNumber}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

export default PostPurchase;


