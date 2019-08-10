import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PhotographerMyPictures extends Component {

  state = {
 
    pictures: [{
      id: "27",
      title: "Just a Beauty",
      filePath: "/images/picture2.jpg"
    },
    {
      id: "28",
      title: "Wedding Day",
      filePath: "/images/picture3.jpg"
    },
    {
      id: "28",
      title: "Starry Night",
      filePath: "/images/picture1.jpg"
    },
    {
      id: "28",
      title: "Another Nice Picture",
      filePath: "/images/picture8.jpg"
    }],
   
  };

  // This needs to be uncommented when ORM is set up
  componentWillMount() {
    API.getPhotographerPhotos()
      .then(photoData => this.setState({pictures: photoData.data}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="wrapper">
        <PhotoNav
         
        />
        <div style={flexContainer}>
          {this.state.pictures.map((pic, index) => (
            <PicGrid
              key={index}
              link={"photographerphotoview/" + pic.id}
              filePath={pic.filePath}
              name={pic.title}
            />
          )
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default PhotographerMyPictures;


