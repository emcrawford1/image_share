import React from "react";

const box = {
  marginTop: '1.5%',
  marginRight: '0.75%',
  marginBottom: '0%',
  marginLeft: '0.75%',
  cursor: 'pointer',

}

const textStyle = {
  textAlign: "center"
}
const price = {
  marginRight: "20px",
  marginLeft: "20px"
}

//Will need to wrap this in a flexbox div

export function PicGrid(props) {
  return (
    <div style={box}>
    <a href={"/" + props.link}>
      <img src={props.filePath} className="rounded-sm" style={box} alt="" />
      <div style={textStyle}>{props.name}</div>
    </a>
    </div>
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
