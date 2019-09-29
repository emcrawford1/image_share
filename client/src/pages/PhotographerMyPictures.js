import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import { getJwt } from "../helpers/jwt";
import { noItems } from "../helpers/noItems";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { timingSafeEqual } from "crypto";

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


  componentDidMount() {
    this.setState({ jwt: getJwt() }, () => {

      API.getPhotographerPhotos(this.state.jwt)
        .then(pictureData => {
          console.log(pictureData);
          this.setState({
            pictures: pictureData.data,
            loading: false,
            isAuthenticated: true
          })
          console.log(this.state)
        })
        .catch(err => {
          console.log(err)
          this.setState({
            loading: false,
            isAuthenticated: false
          })
        });
    });
  }

  render() {

    if (this.state.loading === true && this.state.isAuthenticated === false) {
      return (
        <noItems
          message="Loading...."
          />
      )
    }

    if (this.state.loading === false && this.state.isAuthenticated === false) {
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
              filePath={pic.filePath}
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


