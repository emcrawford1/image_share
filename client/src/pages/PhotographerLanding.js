import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PUserProfile } from "../components/Card";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};


class PViewPhotographerProfile extends Component {

  state = {

    userId: this.props.match.params.userId,

    profile: [{
    filePath: "/images/picture5.jpg",
    userName: "wdenkins",
    firstName: "Wanda",
    lastName: "Denkins",
    dateAdded: "May 4, 2019",
    aboutMe: "Serving up our own rendition of veggie burgers"
    }]

  };

  // This needs to be uncommented when ORM is set up
  componentWillMount() {
    const userId = this.state.userId;
    API.getPhotographerProfile(userId)
      .then(profileData => {
        console.log(profileData);
        this.setState({ profile: profileData.data })
        console.log(this.state.profile)
      })
      .catch(err => console.log(err));
  }

  render() {

    return (
      <div className="wrapper">
        <PhotoNav
          id={this.state.userId}
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

export default PViewPhotographerProfile;