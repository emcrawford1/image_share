import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { AddPhotos } from "../components/Form";
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

class PhotographerAddPhotos extends Component {

  state = {
    categories: [],
    category: "Life",
    picType: "1",
    imageName: "",
    price: "",
    description: "",
    fileUploadMessage: "Choose file",
    imageFile: null,
    loading: true,
    isAuthenticated: false,
    jwt: "",
    imageNameFlag: "",
    priceFlag: "",
    fileFlag: "",
    standardError: "**This is a required field.",
    priceError: "**This is a required field.  Decimals will be rounded to the nearest dollar.",
    fileError: "**You must choose a file.",
    uploadFlag: "",
    uploadMsg: "**Upload unsuccessful.  Please try again."
  };

  //Validation Method
  inputValidation = input => input !== "" ? true : false;

  //Validation method to determine if the price is numeric
  priceValidation = input => {
    if (this.inputValidation(input) === true) {
      if (isNaN(input)) {
        this.setState({ priceError: "**This field must be a numeric value." })
        return false
      }
      else return true;
    }
    else {
      this.setState({ priceError: "**This is a required field.  Decimals will be rounded to the nearest dollar." })
      return false;
    }
  }

  //Validation to check to see if the file is a jpg or png type
  fileValidation = file => {

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      this.setState({ fileError: "**Please choose an appropriate file type (.jpeg or .png)." })
      return false;
    }
    else return true;
  }


  //Need to get list of categories that will be populated in the form.
  componentDidMount() {
    API.getCategories()
      .then(catData => {
        setCookie(catData.data.token);
        this.setState({
          categories: catData.data.categories.map(x => x['name']),
          loading: false,
          isAuthenticated: true
        }, () => {
          this.setState({
            category: this.state.categories[0]
          })
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          isAuthenticated: false
        })
      })
  }

  //Method for submitting the information and file selected in the form, to the server. 
  fileSelectedHandler = event => {
    event.preventDefault();

    //Reset uploadFlag to empty string so that the upload message will not be displayed
    this.setState({ uploadFlag: "" })

    //This object will contain key values for the flag variables.  
    const imageObj = {
      imageNameFlag: this.state.imageNameFlag,
      priceFlag: this.state.priceFlag,
      fileFlag: this.state.fileFlag
    }

    //Validation to check if the imageName variable (Image name input value) is empty
    if (this.inputValidation(this.state.imageName) === false) {
      this.setState({ imageNameFlag: false });
      imageObj.imageNameFlag = false;
    }
    else {
      this.setState({ imageNameFlag: true })
      imageObj.imageNameFlag = true;
    }


    //Validation to check if the price is numeric
    if (this.priceValidation(this.state.price) === false) {
      this.setState({ priceFlag: false })
      imageObj.priceFlag = false;
    }
    else {
      this.setState({ priceFlag: true })
      imageObj.priceFlag = true;
    }

    //Validation to check if an image has been uploaded
    if (this.state.imageFile === null) {
      this.setState({
        fileFlag: false,
        fileError: "**You must choose a file."
      })
      imageObj.fileFlag = false;
    }
    else {

      if (this.fileValidation(this.state.imageFile)) {
        this.setState({ fileFlag: true })
        imageObj.fileFlag = true
      }
      else {
        this.setState({ fileFlag: false })
        imageObj.fileFlag = false;
      }
    }

    //Create FormData object to send the data to the server
    const imageForm = new FormData();

    //Append imageForm (FormData object) with key value pairs that will be sent to the server & database
    imageForm.append('category', this.state.category);
    imageForm.append('picType', this.state.picType);
    imageForm.append('imageName', this.state.imageName);
    imageForm.append('price', this.state.price);
    imageForm.append('description', this.state.description);
    imageForm.append('imageFile', this.state.imageFile);

    //If this is a profile picture upload the photo using the profile upload method.  This will also check to make  
    //sure the user has selected a file.
    if (this.state.picType === '0') {

      if (imageObj.fileFlag === true) {
        API.uploadProfilePic(imageForm)
          .then(uploadData => {
            setCookie(uploadData.data)
            this.setState({
              uploadMsg: "**Upload Successful.",
              uploadFlag: true
            })
          })
          .catch(err => {
            this.setState({ 
              uploadMsg: "**File upload failed.  Please try again.",
              uploadFlag: false
            })
          })
      }

    }

    //If this is an image for sale, upload the uploadPhoto method.  This will also check to make sure that the 
    //user has entered appropriate data into the proper fields (Image name, price, and file selection)
    if (this.state.picType === '1') {

      if (imageObj.imageNameFlag === true && imageObj.priceFlag === true && imageObj.fileFlag === true) {
        API.uploadPhoto(imageForm)
          .then(uploadData => {
            setCookie(uploadData.data.token)
            this.setState({
              uploadMsg: "**Upload Successful.",
              uploadFlag: true
            })
          })
          .catch(err => {
            this.setState({
              uploadMsg: "**File upload failed.  Please try again.",
              uploadFlag: false
            })
          })
      }

    }
  }

  //Method for handling input change.  When the user changes a value on the form, it is automatically updated 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  //Method for handling file input 
  handleFileInput = event => {
    event.preventDefault();
    if (event.target.files[0] !== undefined) {
      this.setState({
        fileUploadMessage: event.target.files[0].name,
        imageFile: event.target.files[0]
      }, () => console.log(this.state.imageFile))
    }
  }

  render() {
    let disabled = false;
    let titlePlaceHolder;
    let descriptionPlaceHolder;

    //Setting placeholder for images that are for sale
    if (this.state.picType === '1') {
      disabled = false;
      titlePlaceHolder = "A beautiful day in the park....";
      descriptionPlaceHolder = "Just got finished spending this beautiful Fall afternoon in the park."
    }

    //Setting placeholder for profile images
    if (this.state.picType === '0') {
      disabled = true;
      titlePlaceHolder = "Profile Picture";
      descriptionPlaceHolder = "Profile Picture";
    }

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
        <PhotoNav />
        <div className="container" style={flexContainer}>
          <AddPhotos
            BtnLabel={"Add Image"}
            disabled={disabled}
            picType={"picType"}
            picTypeLabel={"Choose picture type:"}
            picProfile={"Add profile picture"}
            picForSale={"Add image to sale"}
            categories={this.state.categories}
            categoryLabel={"Choose a category:"}
            category={"category"}
            priceLabel={"Enter price:"}
            price={"price"}
            pricePlaceholder={"50"}
            name={"imageName"}
            nameLabel={"Image name:"}
            titlePlaceHolder={titlePlaceHolder}
            imageFile={"imageFile"}
            description={"description"}
            descriptionLabel={"Image Description:"}
            descriptionPlaceholder={descriptionPlaceHolder}
            uploadLabel={"Choose file:"}
            uploadMessage={this.state.fileUploadMessage}
            upload={"upload"}
            onChange={this.handleInputChange}
            fileInputChange={this.handleFileInput}
            fileUpload={this.fileSelectedHandler}
            imageNameFlag={this.state.imageNameFlag}
            priceFlag={this.state.priceFlag}
            fileFlag={this.state.fileFlag}
            standardError={this.state.standardError}
            priceError={this.state.priceError}
            fileError={this.state.fileError}
            uploadMsg={this.state.uploadMsg}
            uploadFlag={this.state.uploadFlag}
          />
        </div>
        <Footer />
      </div>

    )
  }
}

export default PhotographerAddPhotos;