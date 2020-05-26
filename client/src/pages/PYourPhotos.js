import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
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

class PYourPhotos extends Component {

  state = {
    confId: this.props.match.params.confId,
    pictures: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

//Check to see if the confNum is greater than 0.  If so, display the pictures associated with that specific confirmation 
//number.  If the confNum is less than 0, display all the user's purchased photos.
  componentDidMount() {
 
      const confNum = this.state.confId;
      if (confNum > 0) {
        API.getByConf(confNum)
          .then(confData => {
            setCookie(confData.data.token)
            this.setState({ 
              pictures: confData.data.confirmationData,
              loading: false,
              isAuthenticated: true
             })
          })
          .catch(err => 
            {
              console.log(err)
              this.setState({
                loading: false,
                isAuthenticated: false
              })
            })
      }
      else {
        API.getByEmail()
          .then(emailData => {
            setCookie(emailData.data.token)
            this.setState({ 
              pictures: emailData.data.photoData,
              loading: false,
              isAuthenticated: true
             })
          })
          .catch(err => {
            console.log(err);
            this.setState({
              loading: false,
              isAuthenticated: false
            })
          })
      }
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
    if (this.state.pictures.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav
          />
          <div className="container">
            <h2>You have not purchased any photos yet.</h2>
          </div>
          <Footer />
        </div>
      )
    }

    return (
      <div className="wrapper">
        <PurchNav
        />
        <div style={flexContainer}>
          {this.state.pictures.map((pic, index) => (
            <PicGrid
              key={index}
              link={"purchasedphotoview/" + pic.id}
              filePath={pic.restrictedFilePath}
              name={pic.title}
            />
          )
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default PYourPhotos;