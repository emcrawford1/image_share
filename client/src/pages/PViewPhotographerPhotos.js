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

class PViewPhotographerPhotos extends Component {

  state = {
    photographerId: this.props.match.params.photographerId,
    pictures: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  //Get photographer's photos
  componentDidMount() {
    const photographerId = this.state.photographerId;
   
    API.viewPhotographerPhotos(photographerId)
      .then(photoData => { 
       setCookie(photoData.data.token);
        this.setState({
          pictures: photoData.data.photographerData,
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
    if(this.state.loading === true && this.state.isAuthenticated === false) {
      return (
        <NoItems
        message="Loading..."
        />
      )
    }

    if(this.state.loading === false && this.state.isAuthenticated === false) {
      removeCookieJwt();
      return(
        <Redirect to="/" />
      )
    }
    return (
      <div className="wrapper">
        <PurchNav />
        <div style={flexContainer}>
          {this.state.pictures.map((pic, index) => (
            <PicGrid
              key={index}
              link={"PSpecificPictureView/" + pic.id}
              filePath={pic.unrestrictedFilePath}
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

export default PViewPhotographerPhotos;


