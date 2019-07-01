import React, { Component } from "react";
import { RegisterForm } from "../components/Form";
import Footer from "../components/Footer";
import { RegisterNav } from "../components/Nav";

import API from "../utils/API";


//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',

};

//Not currently working.  Might need to add react-native-linear-gradient
const backgroundImage = {

  minHeight: "100%",
  minWidth: "100%",
  background: "linearGradient(0deg,rgba(5, 48, 238, 0.3),rgba(118, 139, 231, 0.3)),url(/images/city_background.jpg)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  color: "rgba(192, 199, 228, 0.3)",
  marginBottom: "100px"


}

class PostPurchase extends Component {

  state = {
    userId: "10",
    email: "",
    password: "",
    aboutMe: "",
    accountType: "",
    searchVal: ""
  };

  //This needs to be uncommented when ORM is set up
  // componentWillMount() {
  //   API.getPictures(this.props.match.params.category)
  //     .then(res => this.setState({pictures: res.data, searchValue: "" }))
  //     .catch(err => console.log(err));
  // }

  registerUser = event => {
    event.preventDefault();
    
    console.log(this.state)
  }

  createAccount = event => {
    event.preventDefault();
    console.log(this.state.email)
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <div>
        <RegisterNav />
        <div className="container" style={flexContainer}>

          <RegisterForm
            BtnLabel={"Create Account"}
            emailLabel={"Email:"}
            firstNameLabel={"First Name:"}
            lastNameLabel={"Last Name:"}
            aboutMeLabel={"About Me:"}
            accountTypeLabel={"Account Type:"}
            accountPhotographer={"Photographer"}
            accountPurchaser={"Purchaser"}
            accountDefault={"Choose..."}
            emailMessage={"**Your email address will be your username."}
            passwordLabel={"Password:"}
            emailName={"email"}
            passwordName={"password"}
            firstName={"firstName"}
            lastName={"lastName"}
            aboutMe={"aboutMe"}
            accountType={"accountType"}
            onChange={this.handleInputChange}
            handleRegister={this.registerUser}
            
          />
        </div>
        <Footer />
      </div>

    )
  }
}

export default PostPurchase;


