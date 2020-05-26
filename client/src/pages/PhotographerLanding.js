import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PUserProfile } from "../components/Card";
import API from "../utils/API";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
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


//React lifecycle componentDidMount method.  Calls getPhotographerProfile method to get the photographer's 
//profile.
  componentDidMount() {
    API.getPhotographerProfile()
      .then(profileData => {

        //Format date
        let dateStamp = new Date(profileData.data.profile[0].dateAdded).toDateString();

        //Profile object that includes formatted date.  
        let profile = [{
          aboutMe: profileData.data.profile[0].aboutMe,
          dateAdded: dateStamp,
          filePath: profileData.data.profile[0].filePath,
          firstName: profileData.data.profile[0].firstName,
          lastName: profileData.data.profile[0].lastName,
          userName: profileData.data.profile[0].userName
        }]
        
        setCookie(profileData.data.token);
        this.setState({
          profile,
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
  }


  render() {
    if (this.state.loading === true && this.state.isAuthenticated === false) {
      return (
        <div>Loading.....</div>
      )
    }

    if (this.state.loading === false && this.state.isAuthenticated === false) {
      removeCookieJwt();
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