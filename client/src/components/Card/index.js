import React from "react";


//Styling

const cardStyle = {
  width: "1100px",
  marginTop: "50px"
}

const center = {
  textAlign: "center"
}

const addToCartButtonStyle = {
  marginLeft: "10px"
}

const removeFromCartButtonStyle = {

}


//Card functions to be exported

export function PSpecificPic(props) {
  return (
    
  <div className="row no-gutters" style={cardStyle}>
    <div className="col-lg-6">
    <div className="center" style={center}><h5>{props.title}</h5></div>
      <img src={props.filePath} className="card-img" alt={props.title} />
    </div>
    <div className="col-lg-6">
      <div className="card-body">
        <h2 className="card-title">{props.fullName}</h2>
        <a href={props.link}><p className="card-text"><small className="text-muted">{props.username}</small></p></a>
        <p className="card-text">Date Added: {" " + props.dateAdded}</p>
        <p className="card-text">Description: {" " + props.description}</p>
        <div className="center"><h5>Price:</h5>{" $" + props.price}<button style={addToCartButtonStyle} type="button" onClick={props.onClick} className="btn btn-outline-dark" disabled={props.disabled}>Add to Cart</button></div>
      </div>
    </div>
  </div>
  
  );
}


export function PUserProfile(props) {
  return (
    
    <div className="row no-gutters" style={cardStyle}>
      <div className="col-lg-6">
        <img src={props.filePath} className="card-img" alt={props.fullName} />
      </div>
      <div className="col-lg-6">
        <div className="card-body">
          <h2 className="card-title">{props.fullName} <small className="text-muted">{" (" + props.username + ")"}</small></h2>
          <p className="card-text">Business Name: {" " + props.businessName}</p>
          <p className="card-text">Member Since: {" " + props.dateAdded}</p>
          <p className="card-text">About Me: {" " + props.aboutMe}</p>
          <a href={props.link}><div className="card-text">View Pictures</div></a>
        </div>
      </div>
    </div>
    
    );
}

export function PurchaseCart(props) {
  return (

    <div className="row no-gutters">
        <div className="col-md-2">
          <img src={props.image} className="card-img" alt={props.title} />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.fullName}</p>
            <p className="card-text">{props.price}</p>
            <button style={addToCartButtonStyle} type="button" onClick={props.onClick} className="btn btn-outline-danger">Remove</button>
          </div>
        </div>
    </div>

  );
}

