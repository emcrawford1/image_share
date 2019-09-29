import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import API from "../utils/API";
import { getJwt } from "../helpers/jwt";

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

  //Calling API to set state to pictures
  componentDidMount() {

    this.setState({ jwt: getJwt()}, () => {

    API.loadSpecificCategory(this.state.jwt, this.state.catId)
      .then(catData => {
        console.log("Category Data: " + catData)
        this.setState({ pictures: catData.data })
      })
      .catch(err => console.log(err));
    });
  }

  render() {

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

export default PCategoryView;


