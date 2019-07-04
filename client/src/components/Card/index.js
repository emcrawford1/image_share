import React from "react";

//These components could probably be refactored

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

const viewCart = {

  marginBottom: "15px"
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
        <p className="card-text">{props.dateAdded}</p>
        <p className="card-text">{props.description}</p>
        <div className="center">{props.price}<button style={addToCartButtonStyle} type="button" onClick={props.onClick} className={props.BtnClass} disabled={props.disabled}>{props.BtnName}</button></div>
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
          <p className="card-text">Member Since: {" " + props.dateAdded}</p>
          <p className="card-text">About Me: {" " + props.aboutMe}</p>
          <a href={props.link}><div className="card-text">{props.linkDesc}</div></a>
        </div>
      </div>
    </div>
    
    );
}

//This should be refactored and combined with PUserProfile
export function ViewYourPhoto(props) {
  return (
    
    <div className="row no-gutters" style={cardStyle}>
      <div className="col-lg-6">
        <img src={props.filePath} className="card-img" alt={props.fullName} />
      </div>
      <div className="col-lg-6">
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <small className="text-muted">{" (" + props.username + ")"}</small>
          <p className="card-text">{props.dateAdded}</p>
          <p className="card-text">{props.description}</p>
          <p className="card-text">{props.purchasePrice}</p>
        </div>
      </div>
    </div>
    
    );
}



export function ViewCart(props) {
  return (

    <div className="row no-gutters" style={viewCart}>
        <div className="col-md-2">
          <img src={props.image} className="card-img" alt={props.title} />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.fullName}</p>
            <p className="card-text">{"Price: $" + props.price}</p>
            <button style={addToCartButtonStyle} type="button" onClick={props.onClick} className="btn btn-outline-danger">Remove</button>
          </div>
        </div>
    </div>

  );
}

