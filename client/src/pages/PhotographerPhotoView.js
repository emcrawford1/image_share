import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PSpecificPic } from "../components/Card";
import API from "../utils/API";
import { connect } from "net";

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

    userId: this.props.match.params.userId,
    picId: this.props.match.params.picId,
    picture: [{
      filePath: "/images/picture5.jpg",
      userName: "wdenkins79",
      dateAdded: "May 4, 2019",
      price: "400",
      title: "Taking a walk in the snow",
      description: "I decided to take this picture one day when it was bright and snowy out.",
      disabled: "false"
    }],


  };

  // This needs to be uncommented when ORM is set up
  componentWillMount() {
    const picId = this.state.picId;
    API.checkOwnPhoto(picId)
      .then(photoData => {
        console.log(photoData)
        this.setState({ picture: photoData.data })})
      .catch(err => console.log(err));
  }

  //This needs to be uncommented when the ORM is set up
  // addToCart(picId, purchaserId) {
  //   API.addToCart(picId, purchaserId)
  //   .then(this.setState({disabled: true}))
  //   .catch(err => console.log(err));
  // }

  //This will need to call the delete photo method and then take the user back to
  //their photos
  disablePhoto(picId) {

    API.disablePhoto(picId)
    .then(disableData => {
      console.log(disableData);
      window.location.reload();
    })
    .catch(err => console.log(err))
    

  }

  render() {
   
    return (

      <div className="wrapper">
        <PhotoNav
          id={this.state.userId}
        />
        { this.state.picture.map((item, index) => (
        <div style={flexContainer}>
          <PSpecificPic
            key={index}
            fullName={item.title}
            dateAdded={"Date Added: " + item.dateAdded}
            description={"Description: " + item.description}
            price={"Price: $" + item.price}
            filePath={item.filePath}
            BtnClass={BtnStyle}
            BtnName={BtnText}
            disabled={item.disabled}
            onClick={() => this.disablePhoto(item.id)}
          />


        </div>
        ))}
        <Footer />
      </div>
    )
  }
}

export default PhotographerPhotoView;