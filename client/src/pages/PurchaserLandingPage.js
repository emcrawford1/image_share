import React, { Component } from "react";
import { PurchNav } from "../components/Nav";
import Footer from "../components/Footer";
import {PicGrid} from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PurchaserLanding extends Component {

  state = {
    userId: "29",
    pictures: [{
      category: "Weddings",
      filePath: "/images/picture8.jpg"
    },
  {
    category: "Urban",
    filePath: "/images/picture5.jpg"
  }],
    searchVal: ""
  };

  loadCategories() {
    API.loadCategories()
    .then(res => 
     this.setState({ pictures: res.data, searchValue: ""})
     )
     .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="wrapper">
      <PurchNav 
      id={this.state.userId}
      />
      <div style={flexContainer}>
        {this.state.pictures.map ((pic, index) => (
          <PicGrid 
          key={index}
          link={"pcategoryview/" + pic.category}
          filePath={pic.filePath}
          name={pic.category}
          />
        )
          )}
      </div>
      <Footer />
      </div>
    )
  }
}

export default PurchaserLanding;


