import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import API from "../utils/API";
import { Redirect } from "react-router-dom";


//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PhotographerMyPictures extends Component {

  state = {
 
  pictures: [],
  loading: true,
  isAuthenticated: false,
  jwt: ""
   
  };


  //React lifecycle componentDidMount method used to call getPhotographerPhotos method.  This method sends 
  //request to the server for all of the photographer's photos.

  componentDidMount() {

      API.getPhotographerPhotos()
        .then(pictureData => {
          setCookie(pictureData.data.token);
          this.setState({
            pictures: pictureData.data.picData,
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
      removeCookieJwt();
      return (
           <Redirect to='/' />
      )
    }

    if (this.state.pictures.length === 0) {
      return (
        <div className="wrapper">
          <PhotoNav
            id={this.state.userId}
          />
            <h4>You have not uploaded any pictures yet....</h4>
          <Footer />
        </div>
      )
    }
    return (
      <div className="wrapper">
        <PhotoNav
         
        />
        <div style={flexContainer}>
          {this.state.pictures.map((pic, index) => (
            <PicGrid
              key={index}
              link={"photographerphotoview/" + pic.id}
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

export default PhotographerMyPictures;


