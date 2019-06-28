import React from "react";

const cardStyle = {
  width: "1100px",
  marginTop: "50px"
}

const center = {
  textAlign: "center"
}

const buttonStyle = {
  marginLeft: "10px"
}

export function PSpecificPic(props) {
  return (
    
  <div className="row no-gutters" style={cardStyle}>
    <div className="col-lg-6">
    <div className="center" style={center}><h5>{props.title}</h5></div>
      <img src={props.filePath} className="card-img" alt="..." />
      
      
      
    </div>
    <div className="col-lg-6">
      <div className="card-body">
        <h2 className="card-title">{props.fullName}</h2>
        <p className="card-text"><small className="text-muted">{props.username}</small></p>
        <p className="card-text">Date Added: {" " + props.dateAdded}</p>
        <p className="card-text">Description: {" " + props.description}</p>
        <div className="center"><h5>Price:</h5>{" $" + props.price}<button style={buttonStyle} type="button" onClick={props.onClick} className="btn btn-outline-dark" disabled={props.disabled}>Add to Cart</button></div>
      </div>
    </div>
  </div>
  
  );
}



