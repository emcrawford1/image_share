import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PCategoryView extends Component {

  state = {
    catId: this.props.match.params.catId,
    userId: this.props.match.params.userId,
    pictures: [{
      id: "27",
      title: "Nice Picture",
      filePath: "/images/picture8.jpg"
    },
    {
      id: "28",
      title: "Another Nice Picture",
      filePath: "/images/picture5.jpg"
    }],
    
  };

  // This needs to be uncommented when ORM is set up
  componentWillMount() {
  
    API.loadSpecificCategory(this.state.catId)
      .then(catData => {
        console.log(catData)
        this.setState({ pictures: catData.data })
      })
      .catch(err => console.log(err));
  }

  render() {

    if (this.state.pictures.length === 0) {
      return (
        <div className="wrapper">
          <PurchNav
            id={this.state.userId}
          />
          <div className="container">
            <h2>There are no images in this category.</h2>
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className="wrapper">
        <PurchNav
        
        />
        <div style={flexContainer}>
          {this.state.pictures.map((pic, index) => (
            <PicGrid
              key={index}
              link={"PSpecificPictureView/" + this.state.userId + "/" + pic.id}
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

export default PCategoryView;


