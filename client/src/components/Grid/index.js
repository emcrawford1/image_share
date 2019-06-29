import React from "react";

const box = {
  marginTop: '1.5%',
  marginRight: '0.75%',
  marginBottom: '0%',
  marginLeft: '0.75%',
  cursor: 'pointer',

}

const price = {
  marginRight: "20px",
  marginLeft: "20px"
}

//Will need to wrap this in a flexbox div

export function PicGrid(props) {
  return (
    <a href={"/" + props.link}>
      <img src={props.filePath} className="rounded-sm" style={box} alt="" />{props.name}
    </a>
  )
}

export function BtnSet(props) {
  return (
    <div>
      <button type="button" onClick={props.clearCart} className="btn btn-outline-danger">Clear Cart</button>
      {props.totalPrice}
      <button type="button" onClick={props.nextPage} className="btn btn-outline-primary">Next</button>
    </div>
  )
}
