import React, { Component } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { PSpecificPic } from "../components/Card";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PSpecificPictureView extends Component {

  state = {
    id: this.props.match.params.id,
    userId: "1",
    picture: {
      title: "My Veggie Burger Recipe",
      firstName: "Wanda",
      lastName: "Denkins",
      userName: "wandadenkins79",
      dateAdded: "May 4, 2019",
      description: "It's not the best veggie burger I've ever had, but I can get that ground beef real close.",
      price: "100.00",
      filePath: "/images/picture8.jpg"
    },
    searchVal: "",
    disabled: "false"
  };

  //This needs to be uncommented when ORM is set up
  // componentWillMount() {
  //   API.getPictures(this.props.match.params.id)
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
    const addCartDisabled = this.state.disabled === "true";
    console.log(addCartDisabled);
    return (
      <div className="wrapper">
        <Nav />
        <div style={flexContainer}>
          <PSpecificPic
            key={this.state.picture.userName}
            title={this.state.picture.title}
            fullName={this.state.picture.firstName + " " + this.state.picture.lastName}
            username={this.state.picture.userName}
            dateAdded={this.state.picture.dateAdded}
            description={this.state.picture.description}
            price={this.state.picture.price}
            filePath={this.state.picture.filePath}
            link={"/pviewphotographerprofile/" + this.state.picture.userName}
            disabled={addCartDisabled}
            // onClick={() => this.addToCart(this.state.picture.id, this.state.userId)}
            onClick={() => this.addToCart(this.state.disabled)}
          />


        </div>
        <Footer />
      </div>
    )
  }
}

export default PSpecificPictureView;


