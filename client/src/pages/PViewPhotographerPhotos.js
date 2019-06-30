import React, { Component } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PViewPhotographerPhotos extends Component {

  state = {
    userId: "10",
    pictures: [{
      id: "27",
      title: "Nice Picture",
      filePath: "/images/picture1.jpg"
    },
    {
      id: "28",
      title: "Another Nice Picture",
      filePath: "/images/picture2.jpg"
    },
    {
      id: "290",
      title: "This is a third picture",
      filePath: "/images/picture3.jpg"
    },
    {
      id: "30",
      title: "Twenty-seven",
      filePath: "/images/picture4.jpg"
    },
    {
      id: "22",
      title: "Nice Picture",
      filePath: "/images/picture5.jpg"
    },
    {
      id: "4",
      title: "Another Nice Picture",
      filePath: "/images/picture8.jpg"
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
        <Nav
          id={this.state.userId}
        />
        <div style={flexContainer}>
          {this.state.pictures.map((pic, index) => (
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

export default PViewPhotographerPhotos;


