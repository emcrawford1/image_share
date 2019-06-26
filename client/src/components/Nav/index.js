import React from "react";


function Nav(){
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    [Image Share]  
    <a className="navbar-brand" href="/profile">
      Profile
    </a>
    <a className="navbar-brand" href="/logout">
      Logout
    </a>
  </nav>
  )
}

export default Nav;