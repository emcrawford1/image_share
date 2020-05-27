import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { PhotoNav } from "../components/Nav";
import { NoItems } from "../helpers/noItems";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PurchaserLanding extends Component {

  state = {
    pictures: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""

  };


  //React lifecylce method componentDidMount() calls the API.loadCategories method to obtain a list of 
  //categories and their corresponding images.

  componentDidMount() {

    API.loadCategories()
      .then(categoryData => {
        // setCookie(categoryData.data.token);
        this.setState({
          pictures: categoryData.data.categories,
          loading: false,
          isAuthenticated: true
        })
        console.log(this.categoryData);
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

    // if (this.state.loading === false && this.state.isAuthenticated === false) {
    //   removeCookieJwt();
    //   return (
    //     <Redirect to='/' />
    //   )
    // }

    if (this.state.pictures.length === 0) {
      return (
        <div className="wrapper">
          <PhotoNav
            id={this.state.userId}
          />
          <h4>There are not any categories available....</h4>
          <Footer />
        </div>
      )
    }
    return (
      <div className="wrapper">
        <PurchNav />
        <div style={flexContainer}>
          {this.state.pictures.map((pic, index) => (
            <PicGrid
              key={index}
              link={"pcategoryview/" + pic.id}
              filePath={pic.filePath}
              name={pic.category}
            />
          )
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default PurchaserLanding;


