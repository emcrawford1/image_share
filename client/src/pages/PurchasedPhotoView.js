import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
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

    userId: this.props.match.params.userId,
    pictureId: this.props.match.params.picId,

    picture: [{
      pictureId: '5',
      filePath: "/images/picture2.jpg",
      title: "Beautiful picture",
      userName: "leroy4545@gmail.com",
      description: "A crazy beautiful picture of a sunset at a beach.",
      dateAdded: "May 17, 2019",
      purchasePrice: "35"
    }],





  };

  //This needs to be uncommented when ORM is set up
  componentWillMount() {
    const userId = this.state.userId;
    const picId = this.state.pictureId;
    API.displayPurchasedPhoto(userId, picId)
      .then(pictureData => {
        console.log(pictureData.data)
        this.setState({ picture: pictureData.data })
      })
      .catch(err => console.log(err));
  }

  //This needs to be uncommented when the ORM is set up
  // addToCart(picId, purchaserId) {
  //   API.addToCart(picId, purchaserId)
  //   .then(this.setState({disabled: true}))
  //   .catch(err => console.log(err));
  // }


  render() {

    return (
      <div className="wrapper">
        <PurchNav
          id={this.state.userId}
        />
        {this.state.picture.map(pic => (
          < div style={flexContainer}>
          <ViewYourPhoto
          key={pic.id}
          title={pic.title}
          username={pic.userName}
          description={"Description: " + pic.description}
          dateAdded={"Purchase Date: " + pic.dateAdded}
          purchasePrice={"Amount Paid: $" + pic.purchasePrice}
          filePath={pic.filePath}
        />


      </div>
        ))}
        <Footer />
      </div >
    )
  }
}

export default PViewPhotographerProfile;