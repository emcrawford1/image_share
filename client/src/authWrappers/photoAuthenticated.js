import React, { Component } from 'react';
import { getJwt } from "../helpers/jwt";
import API from "../utils/API";
import { withRouter } from 'react-router-dom';


class PhotoAuthenticated extends Component {

  state = {
    email: undefined,
    accountType: undefined
  }

  componentDidMount() {
    const jwt = getJwt();
    if(!jwt) {
      console.log("No Jwt")
      this.props.history.push('/');
    }
    
    API.getUser(jwt)
    .then(userData => {
      console.log("this.props.children = " + JSON.stringify(this.props))
      this.setState({ 
        email: userData.data.email,
        accountType: userData.data.accountType
      });
      if(this.state.accountType === 1) {
        this.props.history.push('/')
      }
    
    })
    .catch(err => {
      console.log(err);
      localStorage.removeItem('ImageShare-jwt')
      this.props.history.push('/')
    })

  }

  render() {
    if(this.state.email === undefined) {
      return (
        <div><h2>Loading...</h2></div>
      )
    }

    return (
      <div>
          {this.props.children.component}
      </div>
    )
  }
}


export default withRouter(PhotoAuthenticated);