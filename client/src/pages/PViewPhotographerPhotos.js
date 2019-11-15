import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import API from "../utils/API";
import { getJwt, removeJwt } from "../helpers/jwt";
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

  //This needs to be uncommented when ORM is set up
  componentDidMount() {
    const photographerId = this.state.photographerId;
    this.setState({ jwt: getJwt() }, () => {
    API.viewPhotographerPhotos(photographerId, this.state.jwt)
      .then(photoData => { 
        console.log(photoData);
        this.setState({
          pictures: photoData.data,
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
    })
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
      removeJwt();
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

export default PViewPhotographerPhotos;


