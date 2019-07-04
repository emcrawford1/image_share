import React, { Component } from "react";
import {PurchNav} from "../components/Nav";
import Footer from "../components/Footer";
import { ViewYourPhoto } from "../components/Card";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

 
class PViewPhotographerProfile extends Component {

  state = {

     userId: "27",
     filePath: "/images/picture2.jpg",
      
      pictureId: this.props.match.params.id,
      title: "Beautiful picture",
      userName: "leroy4545@gmail.com",
      description: "A crazy beautiful picture of a sunset at a beach.",
      dateAdded: "May 17, 2019",
      purchasePrice: "35",
     
     
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
        <PurchNav 
        id={this.state.userId}
        />
        <div style={flexContainer}>
          <ViewYourPhoto
            key={this.state.userName}
            title={this.state.title}
            username={this.state.userName}
            description={"Description: " + this.state.description}
            dateAdded={"Purchase Date: " + this.state.dateAdded}
            purchasePrice={"Amount Paid: $" + this.state.purchasePrice}
            filePath={this.state.filePath}
          />


        </div>
        <Footer />
      </div>
    )
  }
}

export default PViewPhotographerProfile;