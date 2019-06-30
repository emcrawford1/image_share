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
    userId: "10",
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
    searchVal: ""
  };

//This needs to be uncommented when ORM is set up
  // componentWillMount() {
  //   API.getPictures(this.props.match.params.category)
  //     .then(res => this.setState({pictures: res.data, searchValue: "" }))
  //     .catch(err => console.log(err));
  // }

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
          link={"PSpecificPictureView/" + pic.id}
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


