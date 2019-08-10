import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PUserProfile } from "../components/Card";
import API from "../utils/API";
import { getJwt } from "../helpers/jwt";
import { Redirect } from "react-router-dom";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};


class PViewPhotographerProfile extends Component {

  state = {
    jwt: "",
    profile: [{
    }],
    loading: true,
    isAuthenticated: false

  };



  componentDidMount() {
    this.setState({ jwt: getJwt() }, () => {

      API.getPhotographerProfile(this.state.jwt)
        .then(profileData => {
          console.log(profileData);
          this.setState({
            profile: profileData.data,
            loading: false,
            isAuthenticated: true
          })
          console.log(this.state.profile)
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
        <div>Loading.....</div>
      )
    }

    if (this.state.loading === false && this.state.isAuthenticated === false) {
      return (
           <Redirect to='/' />
      )
    }

    if (this.state.loading === false && this.state.isAuthenticated === true) {
      return (
        <div className="wrapper">
          <PhotoNav
            id={this.state.profile.userName}
          />
          {
            this.state.profile.map(item => (
              <div style={flexContainer}>
                <PUserProfile
                  key={item.userName}
                  fullName={item.firstName + " " + item.lastName}
                  username={item.userName}
                  dateAdded={item.dateAdded}
                  aboutMe={item.aboutMe}
                  filePath={item.filePath}
                />
              </div>
            ))}
          <Footer />
        </div>
      )
    }
  }
}


export default PViewPhotographerProfile;