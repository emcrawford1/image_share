import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { AddPhotos } from "../components/Form";
import API from "../utils/API";
import { getJwt, removeJwt } from "../helpers/jwt";
import { NoItems } from "../helpers/noItems";
import { Redirect } from "react-router-dom";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PhotographerAddPhotos extends Component {

  state = {
    categories: [],
    picType: "",
    imageName: "",
    price: "",
    description: "",
    fileUploadMessage: "Choose file",
    loading: true,
    isAuthenticated: false,
    jwt: ""
  };

  //Need to get list of categories that will be populated in the form.
  componentDidMount() {
    this.setState({ jwt: getJwt() }, () => {
      API.getCategories(this.state.jwt)
        .then(data => {
          console.log(data)
          this.setState({
            categories: data.data.map(x => x['name']),
            loading: false,
            isAuthenticated: true
          })
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading: false,
            isAuthenticated: false
          })
        })
    })
  }

  //Method for selecting the image.  Once the image has been selected, the name of the file is set to fileUploadMessage, where it will be displayed 
  //on the form.
  fileSelectedHandler = event => {
    console.log(event.target.files[0])
    if (event.target.files[0] !== undefined) {
      this.setState({
        fileUploadMessage: event.target.files[0].name
      })
    }
  }

//Method for handling input change.  When the user changes a value on the form, it is automatically updated 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
    console.log(this.state)
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
      removeJwt();
      return (
        <Redirect to="/" />
      )
    }

    return (
      <div className="wrapper">
        <PhotoNav />
        <div className="container" style={flexContainer}>
          <AddPhotos
            BtnLabel={"Add Image"}
            picType={"picType"}
            picTypeLabel={"Choose picture type:"}
            picProfile={"Add profile picture"}
            picForSale={"Add image to sale"}
            categories={this.state.categories}
            priceLabel={"Enter price:"}
            price={"price"}
            pricePlaceholder={"50"}
            name={"imageName"}
            nameLabel={"Image name:"}
            imageNamePlaceholder={"A beautiful day in the park...."}
            description={"description"}
            descriptionLabel={"Image Description:"}
            descriptionPlaceholder={"Just got finished spending this beautilful Fall afternoon in the park."}
            uploadLabel={"Choose file:"}
            uploadMessage={this.state.fileUploadMessage}
            upload={"upload"}
            onChange={this.handleInputChange}
            fileUpload={this.fileSelectedHandler}
          />
        </div>
        <Footer />
      </div>

    )
  }
}

export default PhotographerAddPhotos;