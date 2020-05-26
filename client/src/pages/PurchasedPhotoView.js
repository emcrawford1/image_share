import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { ViewYourPhoto } from "../components/Card";
import API from "../utils/API";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";


//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};


class PViewPhotographerProfile extends Component {

  state = {
    pictureId: this.props.match.params.picId,
    picture: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  //React lifecycle method - componentDidMount.  This method will call the displayPurchasedPhoto method which
  //will 
  componentDidMount() {
    const picId = this.state.pictureId;
 
      API.displayPurchasedPhoto(picId)
        .then(pictureData => {

          let formattedDate = new Date(pictureData.data.purchData[0].dateAdded);
          let timeAdded = formattedDate.toLocaleTimeString();
          let dateStamp = `${formattedDate.toDateString()} - ${timeAdded}`;

          let picData = [{
            dateAdded: dateStamp,
            description: pictureData.data.purchData[0].description,
            pictureId: pictureData.data.purchData[0].pictureId,
            purchasePrice: pictureData.data.purchData[0].purchasePrice,
            restrictedFilePath: pictureData.data.purchData[0].restrictedFilePath,
            title: pictureData.data.purchData[0].title,
            userName: pictureData.data.purchData[0].userName
          }]

          setCookie(pictureData.data.token)
          this.setState({
            picture: picData,
            loading: false,
            isAuthenticated: true
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            loading: false,
            isAuthenticated: false
          })
        });
  }


  render() {

    if (this.state.loading === true && this.state.isAuthenticated === false) {
      return (
        <NoItems
          message="Loading...."
        />
      )
    }

    if (this.state.loading === false && this.state.isAuthenticated === false) {
      removeCookieJwt()
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div className="wrapper">
        <PurchNav />
        {this.state.picture.map(pic => (
          < div style={flexContainer}>
            <ViewYourPhoto
              key={pic.id}
              title={pic.title}
              username={pic.userName}
              description={"Description: " + pic.description}
              dateAdded={"Purchase Date: " + pic.dateAdded}
              purchasePrice={"Amount Paid: $" + pic.purchasePrice}
              filePath={pic.restrictedFilePath}
            />
          </div>
        ))}
        <Footer />
      </div >
    )
  }
}

export default PViewPhotographerProfile;