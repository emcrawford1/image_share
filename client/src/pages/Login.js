import React, { Component } from "react";
import { LoginForm } from "../components/Form";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PostPurchaseGrid } from "../components/Grid";
import { Redirect } from 'react-router-dom';
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

class Login extends Component {

  state = {
    email: "",
    password: "",
    accountType: "",  
  };


  registerUser() {
    let path = "/register";
    this.props.history.push(path)
  }

  loginUser = event => {
    event.preventDefault();
    const purchPath = "/purchaserlandingpage";
    // const photoPath = "/photographerlanding";
    const photoPath = "/photographerlandingpage";

    API.loginUser(this.state)
      .then(loginRes => {
        localStorage.setItem('ImageShare-jwt', loginRes.data.token);
        this.setState({accountType: loginRes.data.accountType})
      
        if(this.state.accountType === 0) {
          console.log(photoPath)
          // return (<Redirect to='/photographerlandingpage' />)
          this.props.history.push(photoPath)
          
        }
        if(this.state.accountType === 1) {
     
          this.props.history.push(purchPath)
        }
      })
      .catch(err => console.log(err));
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


