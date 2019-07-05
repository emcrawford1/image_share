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

class PurchaserLanding extends Component {

  state = {
    userId: "td@email.com",
    pictures: [{
      id: "1",
      category: "Weddings",
      filePath: "/images/picture8.jpg"
    },
    {
      id: "2",
      category: "Urban",
      filePath: "/images/picture5.jpg"
    }],
    
  };

  componentWillMount() {
    API.loadCategories()
      .then(catData => {
        console.log(catData);
        this.setState({ pictures: catData.data })
      }
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
          {this.state.pictures.map((pic, index) => (
            <PicGrid
              key={index}
              link={"pcategoryview/" + this.state.userId + "/" + pic.id}
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


