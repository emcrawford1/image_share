import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
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
const BtnStyle = "btn btn-outline-dark";
const BtnText = "Add to Cart";

class PSpecificPictureView extends Component {

  state = {
    userId: this.props.match.params.userId,
    picId: this.props.match.params.picId,
    picture: {
      id: "1",
      title: "My Veggie Burger Recipe",
      firstName: "Wanda",
      lastName: "Denkins",
      userName: "wandadenkins79",
      dateAdded: "May 4, 2019",
      description: "It's not the best veggie burger I've ever had, but I can get that ground beef real close.",
      price: "100.00",
      filePath: "/images/picture8.jpg"
    },
    disabled: "false"
  };

  // This needs to be uncommented when ORM is set up
  componentWillMount() {
    API.loadSpecificPicture(this.state.picId)
      .then(picData => {
        console.log(picData)
        this.setState({ picture: picData.data })

        API.checkCart(this.state.userId, this.state.picId)
          .then(cartData => {
            console.log(cartData.data)

            if (cartData.data.length > 0) {
              this.setState({ disabled: "true" })
            }

            else {
              API.checkPurchases(this.state.userId, this.state.picId)
                .then(purchData => {
                  if (purchData.data.length > 0) {
                    this.setState({ disabled: "true" })
                  }
                })
            }
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
  }

  // This needs to be uncommented when the ORM is set up
  addToCart(userId, picId) {
    API.addToCart(userId, picId)
      .then(cartData => {
        console.log(cartData.data)
        this.setState({ disabled: "true" })
      })
      .catch(err => console.log(err));
  }

  render() {
    const addCartDisabled = this.state.disabled === "true";

    return (
      <div className="wrapper">
        <PurchNav
          id={this.state.userId} />
        <div style={flexContainer}>
          <PSpecificPic
            key={this.state.picture.userName}
            title={this.state.picture.title}
            fullName={this.state.picture.firstName + " " + this.state.picture.lastName}
            username={this.state.picture.userName}
            dateAdded={"Date Added: " + this.state.picture.dateAdded}
            description={"Description: " + this.state.picture.description}
            price={"Price: $" + this.state.picture.price}
            filePath={this.state.picture.filePath}
            link={"/pviewphotographerprofile/" + this.state.userId + "/" + this.state.picture.userName}
            disabled={addCartDisabled}
            BtnClass={BtnStyle}
            BtnName={BtnText}
            // onClick={() => this.addToCart(this.state.picture.id, this.state.userId)}
            onClick={() => this.addToCart(this.state.userId, this.state.picture.id)}
          />


        </div>
        <Footer />
      </div>
    )
  }
}

export default PSpecificPictureView;


