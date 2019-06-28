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

class PCategoryView extends Component {

  state = {
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
      <Nav />
      <div style={flexContainer}>
        {this.state.pictures.map ((pic, index) => (
          <Grid 
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


