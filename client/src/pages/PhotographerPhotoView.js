import React, { Component } from "react";
import {PhotoNav} from "../components/Nav";
import Footer from "../components/Footer";
import { PSpecificPic } from "../components/Card";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};


//Button styling
const BtnStyle = "btn btn-outline-danger";
const BtnText = "Disable";
 
class PhotographerPhotoView extends Component {

  state = {

     userId: "27",
     filePath: "/images/picture5.jpg",
      
      id: this.props.match.params.id,
      userName: "wdenkins79",
      dateAdded: "May 4, 2019",
      price: "400",
      title: "Taking a walk in the snow",
      description: "I decided to take this picture one day when it was bright and snowy out.",
      disabled: "false",
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

  //This will need to call the delete photo method and then take the user back to
  //their photos
  disablePhoto(){
  
    this.setState({ disabled: "true"});
    
  }

  render() {
    const disablePic = this.state.disabled === 'true';
    return (
      
      <div className="wrapper">
        <PhotoNav 
        id={this.state.userId}
        />
        <div style={flexContainer}>
        <PSpecificPic
            key={this.state.userName}
            fullName={this.state.title}
           
            dateAdded={"Date Added: " + this.state.dateAdded}
            description={"Description: " + this.state.description}
            price={"Price: $" + this.state.price}
            filePath={this.state.filePath}
            BtnClass={BtnStyle}
            BtnName={BtnText}
            disabled={disablePic}
            onClick={() => this.disablePhoto()}
          />


        </div>
        <Footer />
      </div>
    )
  }
}

export default PhotographerPhotoView;