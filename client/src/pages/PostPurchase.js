import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PostPurchaseGrid } from "../components/Grid";
import API from "../utils/API";
import { getJwt, removeJwt } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

class PostPurchase extends Component {

  state = {
    firstName: "Danithon",
    confirmationNumber: "34",
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  //Obtain confirmation number
  componentDidMount() {
    this.setState({ jwt: getJwt() }, () => {
      API.displayConf(this.state.jwt)
        .then(confData => {
          console.log(confData)
          this.setState({
            firstName: confData.data[0].firstName,
            confirmationNumber: confData.data[0].confirmationNumber,
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
    return (
      <div className="wrapper">
        <PurchNav
        // id={this.state.userId}
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


