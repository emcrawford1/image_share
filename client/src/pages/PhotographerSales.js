import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PhotographerSalesGrid } from "../components/Grid";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PhotographerSales extends Component {

  state = {

    sales: [{
      picId: "35",
      title: "Starry Night",
      purchaser: "Fred",
      date: "March 3, 2019",
      price: "15"

    },

    {
      picId: "353",
      title: "Snowy Night",
      purchaser: "Jeffrey Jefferson",
      date: "March 30, 2019",
      price: "20"
    },

    {
      picId: "35",
      title: "Snowy Day",
      purchaser: "Bob Diles",
      date: "June 13, 2019",
      price: "35"
    },

    {
      picId: "35",
      title: "Starry Night",
      purchaser: "Timothy Smith",
      date: "March 3, 2019",
      price: "15"
    }],


  };

  //This needs to be uncommented when ORM is set up
  componentWillMount() {
    API.getSales()
      .then(salesData => {
        console.log(salesData)
        this.setState({ sales: salesData.data })
      })
      .catch(err => console.log(err));
  }

  render() {

    if (this.state.sales.length === 0) {
      return (
        <div className="wrapper">
          <PhotoNav
            id={this.state.userId}
          />
          <div className="container">
            <h2>You do not have any sales.</h2>
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className="wrapper">
        <PhotoNav
        />
        <div className="container" >
          <h1>Your Sales:</h1>
          {this.state.sales.map( (sale, index) => (
            <PhotographerSalesGrid
             
              key={index}
              title={sale.title}
              purchaser={sale.purchaser}
              date={"Purchase Date: " + sale.date}
              link={"/photographerphotoview/" + sale.picId}
              price={"Amount Charged: $" + sale.price}
            />
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}

export default PhotographerSales;

