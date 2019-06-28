import React, { Component } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Grid from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PurchaserLanding extends Component {

  state = {
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
      <Nav />
      <div style={flexContainer}>
        {this.state.pictures.map ((pic, index) => (
          <Grid 
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


