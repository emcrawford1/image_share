import React, { Component } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { PUserProfile } from "../components/Card";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

 
class PViewPhotographerProfile extends Component {

  state = {

   
      userName: this.props.match.params.id,
      firstName: "Wanda",
      lastName: "Denkins",
      dateAdded: "May 4, 2019",
      filePath: "/images/picture5.jpg",
      businessName: "Wanda's Burgers",
      aboutMe: "Serving up our own rendition of veggie burgers",
      searchVal: ""
  
  };

  //This needs to be uncommented when ORM is set up
  // componentWillMount() {
  //   API.getPhotographerProfile(this.props.match.params.id)
  //     .then(res => this.setState({pictures: res.data, searchValue: "" }))
  //     .catch(err => console.log(err));
  // }

  //This needs to be uncommented when the ORM is set up
  // addToCart(picId, purchaserId) {
  //   API.addToCart(picId, purchaserId)
  //   .then(this.setState({disabled: true}))
  //   .catch(err => console.log(err));
  // }

  //Testing
  addToCart(lol){
  
    this.setState({disabled: "true"});
    console.log(this.state.disabled);
  }

  render() {

    return (
      <div className="wrapper">
        <Nav />
        <div style={flexContainer}>
          <PUserProfile
            key={this.state.userName}
            fullName={this.state.firstName + " " + this.state.lastName}
            username={this.state.userName}
            businessName={this.state.businessName}
            dateAdded={this.state.dateAdded}
            aboutMe={this.state.aboutMe}
            filePath={this.state.filePath}
            link={"/photouserpictures/" + this.state.username}
          />


        </div>
        <Footer />
      </div>
    )
  }
}

export default PViewPhotographerProfile;