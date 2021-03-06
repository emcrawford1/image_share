import React from "react";
import { removeCookieJwt } from "../../helpers/jwt";

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
      <a className="navbar-brand" style={navSpacer} href={"/purchaserlandingpage/"}>
        Home
    </a>
      <a className="navbar-brand" style={navSpacer} href={"/mypurchases"}>
        My Purchases
    </a>
      <a className="navbar-brand" style={navSpacer} href={"/pyourphotos/0"}>
        My Photos
    </a>
      <a className="navbar-brand" style={navSpacer} onClick={removeCookieJwt} href="/">
        Logout
    </a>
      <a className="navbar-brand" style={navSpacer} href={"/purchasecart"}>
        View Cart
    </a>
    </nav>
  )
}

export function PhotoNav(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <h1 style={imageShareColor}>Image Share</h1>
      <a className="navbar-brand" style={navSpacer} href={"/photographerlandingpage/"}>
        My Profile
    </a>
      <a className="navbar-brand" style={navSpacer} href={"/photographeraddphoto/"}>
        Add Photo
    </a>
      <a className="navbar-brand" style={navSpacer} href={"/photographersales/"}>
        My Sales
    </a>
      <a className="navbar-brand" style={navSpacer} href={"/photographermypictures/"}>
        My Photos
    </a>
      <a className="navbar-brand" style={navSpacer} onClick={removeCookieJwt} href={"/"}>
        Logout
    </a>

    </nav>
  )
}

export function RegisterNav(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <h1 style={imageShareColor}>Image Share</h1>
      <a className="navbar-brand" style={navSpacer} href={"/"}>
        Login
    </a>
    </nav>
  )
}