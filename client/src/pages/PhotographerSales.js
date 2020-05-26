import React, { Component } from "react";
import { PhotoNav } from "../components/Nav";
import Footer from "../components/Footer";
import { PhotographerSalesGrid } from "../components/Grid";
import { removeCookieJwt, setCookie } from "../helpers/jwt";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

//Styling
const flexContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

class PhotographerSales extends Component {

  state = {

    sales: [],
    loading: true,
    isAuthenticated: false

  };

  //React lifecycle method componentDidMount used to call the getSales method.  The getSales method queries the 
  //database and returns a list of the photographer's sales.

  componentDidMount() {
    API.getSales()
      .then(salesData => {

        console.log('Sales data: ', salesData.data.sales[0]
        )

        let sales = salesData.data.sales.map(data => {
          return {
            title: data.title,
            date: new Date(data.date).toDateString(),
            picId: data.picId,
            price: data.price,
            purchaser: data.purchaser
          }
        })
        
        setCookie(salesData.data.token);
        this.setState({
          sales,
          loading: false,
          isAuthenticated: true
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false,
          isAuthenticated: false
        })
      });
  }



  render() {

    //Display "Loading...." message while the app queries the database for this user's sales
    if (this.state.loading === true && this.state.isAuthenticated === false) {
      return (
        <noItems
          message="Loading...."
        />
      )
    }

    //If there is an error with the query, the user will be sent back to their profile page
    if (this.state.loading === false && this.state.isAuthenticated === false) {
      removeCookieJwt();
      return (
        <Redirect to='/' />
      )
    }

    //If the database does not return with any sales data for this user, then a message will be 
    //displayed stating that the user does not have any sales.
    if (this.state.sales.length === 0) {
      return (
        <div className="wrapper">
          <PhotoNav
            id={this.state.userId}
          />
          <h4>You do not have any sales.</h4>
          <Footer />
        </div>
      )
    }


    //If the database does return with sales data, the sales will be displayed.
    return (
      <div className="wrapper">
        <PhotoNav
        />
        <div className="container" >
          <h1>Your Sales:</h1>
          {this.state.sales.map((sale, index) => (
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

