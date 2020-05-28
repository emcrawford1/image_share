import React, { Component } from "react";
import { LoginForm } from "../components/Form";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PostPurchaseGrid } from "../components/Grid";
import { Redirect } from 'react-router-dom';
import API from "../utils/API";
import { setCookie } from "../helpers/jwt"


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

class Login extends Component {

  state = {
    email: "",
    password: "",
    accountType: "",
    userNameFlag: "",
    loginFlag: "",
    userNameMessage: "**Please enter a username.",
    loginMessage: "**Please enter a valid username and password."
  };


  //Attaching keydown event to document so that the form will submit if the user has pressed "Enter"
  componentDidMount() {
    document.body.addEventListener('keydown', this.submitForm)
  }

  //Remove listener
  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.submitForm)
  }

  //Method that checks to see if the user clicked "Enter" (keyCode 13).  If so, the user is logged in.
  submitForm = event => {
    if (event.keyCode === 13) {
      this.loginUser(event)
    }
  }

  registerUser() {
    let path = "/register";
    this.props.history.push(path)
  }

  loginUser = event => {
    event.preventDefault();
    const purchPath = "/purchaserlandingpage";
    const photoPath = "/photographerlandingpage";

    let authObj = {
      loginFlag: this.state.loginFlag,
      userNameFlag: this.state.userNameFlag,
      loginMessage: this.state.loginMessage
    }

    if (this.state.email === "") {
      this.setState({ userNameFlag: true });
      authObj.userNameFlag = true;
    }
    else {
      this.setState({ userNameFlag: false })
      authObj.userNameFlag = false;
    }

    if (this.state.password === "") {
      this.setState({ loginFlag: true, loginMessage: "**Please enter a password." })
      authObj.loginFlag = true;
      authObj.loginMessage = "**Please enter a password.";
    }
    else {
      this.setState({ loginFlag: false })
      authObj.loginFlag = false;
    }

    if (authObj.userNameFlag !== true && authObj.loginFlag !== true) {
      API.loginUser(this.state)
        .then(loginRes => {
          console.log('Login Res: ', loginRes)
          setCookie(loginRes.data.token)
          this.setState({ accountType: loginRes.data.accountType })

          if (this.state.accountType === 0) this.props.history.push(photoPath)
          if (this.state.accountType === 1) this.props.history.push(purchPath)

        })
        .catch(err => {
          console.log('Err: ', err.response.data.message)
          this.setState({ loginFlag: true, loginMessage: "**Please enter a valid username and password." })
        });
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  render() {
    return (
      <div style={backgroundImage}>
        <div className="container" style={flexContainer}>

          <LoginForm
            BtnLabel={"Submit"}
            emailLabel={"Email:"}
            emailMessage={""}
            passwordLabel={"Password:"}
            RgstrBtnLabel={"Register"}
            LgnBtnLabel={"Login"}
            emailName={"email"}
            passwordName={"password"}
            userNameFlag={this.state.userNameFlag}
            loginFlag={this.state.loginFlag}
            userNameMessage={this.state.userNameMessage}
            loginMessage={this.state.loginMessage}
            onChange={this.handleInputChange}
            handleRegister={() => this.registerUser()}
            handleLogin={this.loginUser}
          />
        </div>
      </div>

    )
  }
}

export default Login;


