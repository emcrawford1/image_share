import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { ViewYourPhoto } from "../components/Card";
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


class PViewPhotographerProfile extends Component {

  state = {
    pictureId: this.props.match.params.picId,
    picture: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  //This needs to be uncommented when ORM is set up
  componentDidMount() {
    const picId = this.state.pictureId;
    this.setState({ jwt: getJwt() }, () => {
      API.displayPurchasedPhoto(picId, this.state.jwt)
        .then(pictureData => {
          console.log("Picture Data: ", pictureData.data)
          this.setState({
            picture: pictureData.data,
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
      removeJwt()
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div className="wrapper">
        <PurchNav />
        {this.state.picture.map(pic => (
          < div style={flexContainer}>
            <ViewYourPhoto
              key={pic.id}
              title={pic.title}
              username={pic.userName}
              description={"Description: " + pic.description}
              dateAdded={"Purchase Date: " + pic.dateAdded}
              purchasePrice={"Amount Paid: $" + pic.purchasePrice}
              filePath={pic.filePath}
            />
          </div>
        ))}
        <Footer />
      </div >
    )
  }
}

export default PViewPhotographerProfile;