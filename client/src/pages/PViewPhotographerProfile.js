import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
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
    userName: this.props.match.params.photographerId,

    profile: [{
      userName: "",
      filePath: "/images/picture5.jpg",
      firstName: "Wanda",
      lastName: "Denkins",
      dateAdded: "May 4, 2019",
      aboutMe: "Serving up our own rendition of veggie burgers"
    }]

  };

 
  componentWillMount() {
    API.viewPhotographerProfile(this.state.userName)
      .then(profileData => {
        console.log(profileData)
        this.setState({ profile: [profileData.data]})
      })
      .catch(err => console.log(err));
  }



  render() {

    return (
      <div className="wrapper">
        <PurchNav
          id={this.state.userId}
        />
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
            link={"/pviewphotographerphotos/" + this.state.userId + "/" + item.userName}
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