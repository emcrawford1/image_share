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

class PYourPhotos extends Component {

  state = {
    confId: this.props.match.params.confId,
    pictures: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  // This needs to be uncommented when ORM is set up
  componentDidMount() {
    this.setState({ jwt: getJwt() }, () => {
      const confNum = this.state.confId;
      if (confNum > 0) {
        API.getByConf(confNum, this.state.jwt)
          .then(confData => {
            console.log(confData)
            this.setState({ 
              pictures: confData.data,
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
        API.getByEmail(this.state.jwt)
          .then(emailData => {
            console.log(emailData)
            this.setState({ 
              pictures: emailData.data,
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
    })
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
      removeJwt()
      return (
           <Redirect to='/' />
      )
    }
    if (this.state.pictures.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav
          // id={this.state.userId}
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
        // id={this.state.userId}
        />
        <div style={flexContainer}>
          {this.state.pictures.map((pic, index) => (
            <PicGrid
              key={index}
              link={"purchasedphotoview/" + pic.id}
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

export default PYourPhotos;