import React from "react";

//This could probably be refactored into one Nav bar.

//Styling
const navSpacer = {
  marginLeft: "15px"
}

const imageShareColor = {
  color: "rgba(192, 199, 228, 0.3)",
}

export function PurchNav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <h1 style={imageShareColor}>Image Share</h1>
    <a className="navbar-brand" style={navSpacer} href="/purchaserlandingpage">
        Home
    </a>
    <a className="navbar-brand" style={navSpacer} href={"/mypurchases/" + props.id}>
        My Purchases
    </a>
    <a className="navbar-brand" style={navSpacer} href={"/pyourphotos/" + props.id}>
        My Photos
    </a>
      <a className="navbar-brand" style={navSpacer} href="/logout">
        Logout
    </a>
    <a className="navbar-brand" style={navSpacer} href={"/purchasecart/" + props.id}>
        View Cart
    </a>
    {/* <div className="container">
    <div className="row">
  
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search Photos by Tag" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <div className="input-group-append">
          <button className="btn btn-outline-transparent text-white" type="button" id="button-addon2">Search</button>
        </div>
      </div>
      </div>
      </div> */}
    </nav>
  )
}

export function PhotoNav(props) {

  return(
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <h1 style={imageShareColor}>Image Share</h1>
    <a className="navbar-brand" style={navSpacer} href={"/photographerlanding/" + props.id}>
        My Profile
    </a>
    <a className="navbar-brand" style={navSpacer} href={"/addphoto/" + props.id}>
        Add Photo
    </a>
      <a className="navbar-brand" style={navSpacer} href={"/photographersales/" + props.id}>
        My Sales
    </a>
    <a className="navbar-brand" style={navSpacer} href={"/photographermypictures/" + props.id}>
        My Photos
    </a>
    <a className="navbar-brand" style={navSpacer} href={"/logout"}>
        Logout
    </a>
    
    </nav>
  )
}

export function RegisterNav(props) {

  return(
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <h1 style={imageShareColor}>Image Share</h1>
    <a className="navbar-brand" style={navSpacer} href={"/"}>
        Login
    </a>
    </nav>
  )
}