import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PSpecificPic } from "../components/Card";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
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
      
    API.loadSpecificPicture(this.state.picId)
      .then(picData => {
        setCookie(picData.data.token);

        //Format date 
        let formattedDate = new Date(picData.data.picture.dateAdded);
        let timeAdded = formattedDate.toLocaleTimeString();
        let dateStamp = `${formattedDate.toDateString()} - ${timeAdded}`;

        //Create object with formatted date
        let pictureData = {
          dateAdded: dateStamp,
          description: picData.data.picture.description,
          firstName: picData.data.picture.firstName,
          id: picData.data.picture.id,
          lastName: picData.data.picture.lastName,
          price: picData.data.picture.price,
          title: picData.data.picture.title,
          unrestrictedFilePath: picData.data.picture.unrestrictedFilePath,
          userName: picData.data.picture.userName
        }

        this.setState({ picture: pictureData})
        API.checkCart(this.state.picId)
          .then(cartData => {
           
            if (cartData.data.length > 0) {
              this.setState({ 
                disabled: "true",
                loading: false,
                isAuthenticated: true 
              })
            }

            else {
              API.checkPurchases(this.state.picId)
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
  }

 //Add to cart method
  addToCart(picId) {
    const picObject = {
      picId
    }
    API.addToCart(picObject)
      .then(cartData => {
        setCookie(cartData.data.token);
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
      removeCookieJwt();
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
            filePath={this.state.picture.unrestrictedFilePath}
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


