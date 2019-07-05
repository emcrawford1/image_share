import React, { Component } from "react";
import {PurchNav} from "../components/Nav";
import Footer from "../components/Footer";
import { PicGrid } from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PYourPhotos extends Component {

  state = {
    userId: this.props.match.params.userId,
    confId: this.props.match.params.confId,
    pictures: [{
      id: "27",
      title: "Nice Picture",
      filePath: "/images/picture3.jpg"
    },
    {
      id: "28",
      title: "Another Nice Picture",
      filePath: "/images/picture4.jpg"
    },
    {
      id: "290",
      title: "This is a third picture",
      filePath: "/images/picture5.jpg"
    },
    {
      id: "30",
      title: "Twenty-seven",
      filePath: "/images/picture8.jpg"
    }],
   
  };

  // This needs to be uncommented when ORM is set up
  componentWillMount() {
    const confNum = this.state.confId;
    const userNum = this.state.userId;
    console.log(confNum + userNum);
    if(confNum > 0) { 
      API.getByConf(confNum)
      .then(confData => {
        console.log(confData)
        this.setState({ pictures: confData.data})
      })
      .catch(err => console.log(err))
    }
    else {
      API.getByEmail(userNum)
      .then(emailData => {
        console.log(emailData)
        this.setState({ pictures: emailData.data})
      })
    }
  }

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
              link={"purchasedphotoview/" + this.state.userId + "/" + pic.id}
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

export default PYourPhotos;