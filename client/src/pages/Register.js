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
    email: "",
    password: "",
    aboutMe: "",
    accountType: "",
    firstName: "",
    lastName: "",
    emailFlag: "",
    passwordFlag: "",
    accountTypeFlag: "",
    firstNameFlag: "",
    lastNameFlag: "",
    duplicateFlag: true,
    emailError: "**This is a required field.",
    passwordError: [],
    duplicateAccts: []

  };

  registerUser = event => {
    event.preventDefault();

    //Resetting duplicateFlag to true since the form has been resubmitted
    this.setState({
      duplicateFlag: true,
      emailError: "**This is a required field.",
      passwordFlag: "",
      accountTypeFlag: "",
      firstNameFlag: "",
      lastNameFlag: ""

    });

    //This object will be sent to server with a POST call (API.registerUser method)
    const regUser = {
      email: this.state.email,
      password: this.state.password,
      aboutMe: this.state.aboutMe,
      accountType: this.state.accountType,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      duplicateAccts: [...this.state.duplicateAccts]
    }

    //Due to the ansync nature of setState, separate, local variables for the flags will be declared below.  These variables keep
    //track of the validity of the input values and will be used to determine if an API call to the registerUser method will be made.
    const userFlags = {
      emailFlag: true,
      passwordFlag: true,
      accountTypeFlag: true,
      firstNameFlag: true,
      lastNameFlag: true,
      duplicateFlag: true
    }

    //Variable to check if input is valid.  If any of the "flag" variables are set to false (the fields are empty)
    //the inputValid variable will be set to false and the data will not be submitted to the server for further 
    //processing.
    let inputValid = true;



    //Calling the inputValidation function on the email, firstName, and lastName fields to determine if these fields
    //are empty.  If so, the corresponding "flag" variable will be set to false.  If not, the corresponding variables
    //are set to true (otherwise the flag variable will never be reset to true).  


    //Input validation for user email
    if(this.inputValidation(regUser.email) === false) {
      this.setState({
        emailFlag: false
      })
      userFlags.emailFlag = false
    }

    else {
      this.setState({ emailFlag: true })
    }
    
    //Input validation for password
    if(this.inputValidation(regUser.password) === false) {
      this.setState({ passwordFlag: false});
      userFlags.passwordFlag = false;
    }

    else {
      this.setState({ passwordFlag: true})
    }

    //Input validation for firstName 
    if(this.inputValidation(regUser.firstName) === false){
      this.setState({ firstNameFlag: false});
      userFlags.firstNameFlag = false;
    }

    else{
      this.setState({ firstNameFlag: true })
    }


    //Input validation for lastName
    if(this.inputValidation(regUser.lastName) === false){
      this.setState({ lastNameFlag: false })
      userFlags.lastNameFlag = false;
    }

    else {
      this.setState({ lastNameFlag: true })
    }

    //Input validation for accountType
    if(regUser.accountType !== '0' && regUser.accountType !== '1') {
      this.setState({ accountTypeFlag: false }) 
      userFlags.accountTypeFlag = false;
    }
    
    else {
    this.setState({ accountTypeFlag: true });
    }


    //Password validation
    if(this.passwordValidation(regUser.password) === false ) {
      this.setState({ passwordFlag: false })
      userFlags.passwordFlag = false;
    }

    else { 
      this.setState({ passwordFlag: true})
    }


    //Logic to determine if any of the "flag" variables have been set to false.  If so, the inputValid variable will be 
    //set to false and will prevent data from being submitted to the server 
    if (userFlags.emailFlag === false) inputValid = false;
    if (userFlags.passwordFlag === false) inputValid = false;
    if (userFlags.firstNameFlag === false) inputValid = false;
    if (userFlags.accountTypeFlag === false) inputValid = false;

    if(regUser.duplicateAccts.includes(this.state.email)) this.setState({ 
      emailError: "**This username has already been taken.  Please choose a different one.",
      emailFlag: false
    })
   
    //If the inputValid variable is set to true, then the data will be sent to the server for further processing. 
    if (inputValid) {

      API.registerUser(regUser)
        .then(registerData => console.log(registerData))
        .catch(err => {

          if (err.response.data === 'unique violation') 
          
          if(!this.state.duplicateAccts.includes(this.state.email)) this.setState({ duplicateAccts: [...this.state.duplicateAccts, this.state.email]})
          
          this.setState({
            duplicateFlag: false,
            emailError: "**This username has already been taken.  Please choose a different one.",
          })
        })
    }
  }


  //Function for validating data.  This function checks to see if the input equals an empty string. If it does not 
  //equal the empty string, it returns true, if it does equal an empty string, it returns false.
  inputValidation = input => input !== "" ? true : false;


  //Password verification function to test if the password registered by the user meets the complexity requirements.
  //(This function is also implemented on the server-side to validate input for new users.  The complexity requirements 
  //are the following:
  //    --Password must be at least 8 characters long
  //    --Password must have at least 3 of the 4 following characters:
  //          *At least one upper case character 
  //          *At least one lower case character 
  //          *At least one digit (0-9) 
  //          *At least one special char 
  passwordValidation = password => {
    let passwordErr = [];



    this.setState({ passwordError: [...passwordErr] })

    //Password error messages
    const lengthError = 'Passwords must be at least 8 characters long.'
    const compError = 'Passwords must contain 3 of the 4 following characters: an upper case character, a lower case character, a digit, or a special character.'

    let passwordBool = true;
    let charCounter = 0;

    let uChar = false;
    let lChar = false;
    let dChar = false;
    let sChar = false;

    //Password length check
    if (password.length < 8) {
      passwordBool = false;
      passwordErr.push(lengthError);
      this.setState({ passwordError: [...passwordErr] })
    }

    //For loop that checks each character in the password for the complexity requirements
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) > 64 && password.charCodeAt(i) < 91) uChar = true;
      if (password.charCodeAt(i) > 96 && password.charCodeAt(i) < 123) lChar = true;
      if (password.charCodeAt(i) > 47 && password.charCodeAt(i) < 58) dChar = true;
      if (password.charCodeAt(i) > 32 && password.charCodeAt(i) < 48) sChar = true;
    }

    //Increment charCounter variable to determine if the complexity requirements have been met.
    if (uChar) charCounter++;
    if (lChar) charCounter++;
    if (dChar) charCounter++;
    if (sChar) charCounter++;

    //If statement to determine if 3 out of 4 character types have been included in the user's password.
    if (charCounter < 3) {
      passwordErr.push(compError)
      passwordBool = false;
      this.setState({ passwordError: [...passwordErr] })
    }

    return passwordBool;
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

            emailFlag={this.state.emailFlag}
            passwordFlag={this.state.passwordFlag}
            accountTypeFlag={this.state.accountTypeFlag}
            firstNameFlag={this.state.firstNameFlag}
            lastNameFlag={this.state.lastNameFlag}

            standardError={"**This is a required field."}
            emailError={this.state.emailError}
            passwordError={this.state.passwordError}

            duplicateFlag={this.state.duplicateFlag}



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


