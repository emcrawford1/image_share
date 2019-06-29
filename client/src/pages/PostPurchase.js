import React, { Component } from "react";
import Nav from "../components/Nav";
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
    userId: "10",
    firstName: "Danithon",
    confirmationNumber: "34",
    searchVal: ""
  };

  //This needs to be uncommented when ORM is set up
  // componentWillMount() {
  //   API.getPictures(this.props.match.params.category)
  //     .then(res => this.setState({pictures: res.data, searchValue: "" }))
  //     .catch(err => console.log(err));
  // }

  render() {
    return (
      <div className="wrapper">
        <Nav
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


