import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PSpecificPic } from "../components/Card";
import API from "../utils/API";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";

//General styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};


//Button styling
const BtnStyle = "btn btn-outline-danger";
const BtnText = "Disable";

class PhotographerPhotoView extends Component {

  state = {
    picId: this.props.match.params.picId,
    picture: [{
      id: "",
      title: "",
      restrictedFilePath: "",
      price: "",
      userName: "",
      dateAdded: "",
      description: "",
      disabled: false
    }],
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  //Loads user's specific photo
  componentDidMount() {
 
    const picId = this.state.picId;

    API.checkOwnPhoto(picId)
      .then(photoData => {

        let dateAdded = new Date(photoData.data.photoData[0].dateAdded);
        let calendarDate = dateAdded.toDateString();
        let timeAdded = dateAdded.toLocaleTimeString();
        let dateStamp = `${calendarDate} - ${timeAdded}`

        console.log(console.log(dateStamp))
        
        let displayData = [{
          dateAdded: dateStamp,
          description: photoData.data.photoData[0].description,
          disabled: photoData.data.photoData[0].disabled,
          id: photoData.data.photoData[0].id,
          price: photoData.data.photoData[0].price,
          restrictedFilePath: photoData.data.photoData[0].restrictedFilePath,
          title: photoData.data.photoData[0].title,
          userName: photoData.data.photoData[0].userName
        }]
        
        setCookie(photoData.data.token);
        this.setState({ 
          picture: displayData,
          loading: false,
          isAuthenticated: true
        })
      })
      .catch(err => 
        {
          console.log(err);
          this.setState({
            loading: false,
            isAuthenticated: false
          })
        });
  }


  //This allows the user to disable photos that they no longer want to sell
  disablePhoto(picId) {

    API.disablePhoto(picId)
      .then(disableData => {
        setCookie(disableData.data.token);
        const disablePic = this.state.picture.map(item => {
          if(item.disabled === false) {
            return { 
            id: item.id,
            title: item.title,
            restrictedFilePath: item.restrictedFilePath,
            price: item.price,
            userName: item.userName,
            dateAdded: item.dateAdded,
            description: item.description,
            disabled: true
          }
          }
          else {
            return this.state.picture
          }
        })
        this.setState({ picture: disablePic })
      })
      .catch(err => console.log(err))


  }

  render() {

    if (this.state.loading === true && this.state.isAuthenticated === false) {
      return (
        <NoItems
          message='Loading....'
        />
      )
    }

    if (this.state.loading === false && this.state.isAuthenticated === false) {
      removeCookieJwt();
      return (
        <Redirect to="/" />
      )
    }

    return (

      <div className="wrapper">
        <PhotoNav
        />
        {this.state.picture.map((item, index) => (
          <div style={flexContainer}>
            <PSpecificPic
              key={index}
              fullName={item.title}
              dateAdded={item.dateAdded}
              description={"Description: " + item.description}
              price={"Price: $" + item.price}
              filePath={item.restrictedFilePath}
              BtnClass={BtnStyle}
              BtnName={BtnText}
              disabled={item.disabled}
              onClick={() => this.disablePhoto(item.id)}
            />
          </div>
        ))}
        <Footer />
      </div>
    )
  }
}

export default PhotographerPhotoView;