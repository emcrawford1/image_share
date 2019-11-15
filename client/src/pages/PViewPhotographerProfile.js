import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PUserProfile } from "../components/Card";
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
    photographerId: this.props.match.params.photographerId,

    profile: [],
    loading: true,
    isAuthenticated: false,
    jwt: ""

  };


  componentDidMount() {
    const photographerId = this.state.photographerId;

    this.setState({ jwt: getJwt() }, () => {
      API.viewPhotographerProfile(photographerId, this.state.jwt)
        .then(profileData => {
          console.log(profileData)
          this.setState({
            profile: [profileData.data],
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
        {this.state.profile.map((item, index) => (
          <div style={flexContainer}
            key={index + "s"}>
            <PUserProfile
              key={index}
              fullName={item.firstName + " " + item.lastName}
              username={item.userName}
              dateAdded={item.dateAdded}
              aboutMe={item.aboutMe}
              filePath={item.filePath}
              link={"/pviewphotographerphotos/" + item.userName}
              linkDesc={"View Photos"}
            />


          </div>
        ))}
        <Footer />
      </div>
    )
  }
}

export default PViewPhotographerProfile;