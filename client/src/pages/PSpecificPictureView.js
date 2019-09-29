import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PSpecificPic } from "../components/Card";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { getJwt } from "../helpers/jwt";
import { noItems } from "../helpers/noItems";

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
    picId: this.props.match.params.picId,
    picture: {},
    disabled: "false",
    loading: true,
    isAuthenticated: false,
    jwt: ""    
  };

  // Loading a specific picture and then searching the Cart and Purchases table for this picture.  If the picture is found
  //the Add button will be disabled.
  componentDidMount() {
   
    this.setState({ jwt: getJwt() }, () => {
      
    API.loadSpecificPicture(this.state.jwt, this.state.picId)
      .then(picData => {
        this.setState({ picture: picData.data })
        console.log(this.state)
        API.checkCart(this.state.jwt, this.state.picId)
          .then(cartData => {
            console.log(cartData);
            if (cartData.data.length > 0) {
              this.setState({ 
                disabled: "true",
                loading: false,
                isAuthenticated: true 
              })
            }

            else {
              API.checkPurchases(this.state.jwt, this.state.picId)
                .then(purchData => {
                  
                  if (purchData.data.length > 0) {
                    this.setState({ disabled: "true" })
                  }
                  this.setState({ 
                    loading: false,
                    isAuthenticated: true
                  })
                })
            }
          })
          .catch(err => {
            console.log(err)
            this.setState({ loading: false })
          })
      })
      .catch(err => {
        console.log(err)
        this.setState({ loading: false })
      });
    })
  }

 //Add to cart method
  addToCart(picId) {
    console.log(picId)
    console.log(this.state.jwt)
    const picObject = {
      picId
    }
    API.addToCart(this.state.jwt, picObject)
      .then(cartData => {
        console.log(cartData)
        this.setState({ disabled: "true" })
      })
      .catch(err => console.log(err));
  }

  render() {
    const addCartDisabled = this.state.disabled === "true";

    if (this.state.loading === true && this.state.isAuthenticated === false) {
      return (
        <h1>Loading......</h1>
      )
    }

    if (this.state.loading === false && this.state.isAuthenticated === false) {
      return (
           <Redirect to='/' />
      )
    }

    return (
      <div className="wrapper">
        <PurchNav
          id={this.state.picture.id} />
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
            link={"/pviewphotographerprofile/" + this.state.picture.userName}
            disabled={addCartDisabled}
            BtnClass={BtnStyle}
            BtnName={BtnText}
            onClick={() => this.addToCart(this.state.picId)}
          />


        </div>
        <Footer />
      </div>
    )
  }
}

export default PSpecificPictureView;


