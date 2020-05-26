import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import API from "../utils/API";
import { setCookie, removeCookieJwt } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PCategoryView extends Component {

  state = {
    catId: this.props.match.params.catId,
    pictures: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""

  };

  //Calling API to set state to pictures and to set the imageShare cookie to the new token
  componentDidMount() {

    API.loadSpecificCategory(this.state.catId)
      .then(catData => {
        setCookie(catData.data.token)
        this.setState({
          pictures: catData.data.data,
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

    if (this.state.pictures.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav
            id={this.state.userId}
          />
          <div className="container">
            <h2>There are no images in this category.</h2>
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className="wrapper">
        <PurchNav
          id={this.state.userId}
        />
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

export default PCategoryView;


