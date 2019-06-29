import React from "react";

const navSpacer = {
  marginLeft: "15px"
}

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      [Image Share]
    <a className="navbar-brand" style={navSpacer} href="/">
        Home
    </a>
      <a className="navbar-brand" style={navSpacer} href="/logout">
        Logout
    </a>
    <a className="navbar-brand" style={navSpacer} href={"/purchasecart/" + props.id}>
        View Cart
    </a>
    <div className="container">
    <div className="row">
  
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search Photos by Tag" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <div className="input-group-append">
          <button className="btn btn-outline-transparent text-white" type="button" id="button-addon2">Search</button>
        </div>
      </div>
      </div>
      </div>
    </nav>
  )
}

export default Nav;