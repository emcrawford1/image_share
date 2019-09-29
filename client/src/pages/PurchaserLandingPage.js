import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import { getJwt } from "../helpers/jwt";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { PhotoNav } from "../components/Nav";

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


  componentDidMount() {
    this.setState({ jwt: getJwt() }, () => {

      API.loadCategories(this.state.jwt)
        .then(categoryData => {
          console.log(categoryData);
          this.setState({
            pictures: categoryData.data,
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
            <h4>There are not any categories available....</h4>
          <Footer />
        </div>
      )
    }
    return (
      <div className="wrapper">
        <PurchNav/>
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


