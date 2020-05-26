import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PUserProfile } from "../components/Card";
import API from "../utils/API";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
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

    API.viewPhotographerProfile(photographerId)
      .then(profileData => {

        //Format date 
        let formattedDate = new Date(profileData.data.photoProfileData.dateAdded);
        let timeAdded = formattedDate.toLocaleTimeString();
        let dateStamp = `${formattedDate.toDateString()} - ${timeAdded}`;

        
        let profile = [{
          aboutMe: profileData.data.photoProfileData.aboutMe,
          dateAdded: dateStamp,
          filePath: profileData.data.photoProfileData.filePath,
          firstName: profileData.data.photoProfileData.firstName,
          lastName: profileData.data.photoProfileData.lastName,
          userName: profileData.data.photoProfileData.userName
        }];

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