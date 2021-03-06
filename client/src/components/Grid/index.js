import React from "react";

const box = {
  marginTop: '1.5%',
  marginRight: '0.75%',
  marginBottom: '0%',
  marginLeft: '0.75%',
  cursor: 'pointer',
  maxWidth: "25em"

}

const textStyle = {
  textAlign: "center"
}
const price = {
  marginRight: "20px",
  marginLeft: "20px"
}

const postPurchaseStyle = {
  marginTop: "25%",
 
}

const myPurchaseStyle = {
  marginTop: "25px"
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
      {props.totalPrice}
      <button type="button" onClick={props.nextPage} className="btn btn-outline-primary ml-2">Next</button>
      <button type="button" onClick={props.clearCart} className="btn btn-outline-danger ml-1">Clear Cart</button>
    </div>
  )
}

export function PostPurchaseGrid(props) {
  return(
  <div style={postPurchaseStyle}>
     <div className="row">
    <h1>[Image Share]</h1>
    </div>
    <div className="row">
      {props.thankYouMessage} 
    </div>
    <div className="row">
      {props.confirmationNumber}
    </div>
  </div>
  
  )
}

export function MyPurchasesGrid(props) {
  return(
    <div style={myPurchaseStyle}>
      <h3>{props.confirmationNumber}</h3>
      <div className="row">
        <h5 className="col">{props.date}</h5>
        <a href={props.link}>View Photos</a>
        <h5 className="col">{props.totalPrice}</h5>
        
      </div>
    </div>
  )
}


export function PhotographerSalesGrid(props) {
  return(
    <div style={myPurchaseStyle}>
      <h3>{props.dateSold}</h3>
      <div className="row">
        <h5 className="col"><a href={props.link}>{props.title}</a></h5>
        <h5 className="col">{props.purchaser}</h5>
        <h5 className="col">{props.date}</h5>
        <h5 className="col">{props.price}</h5>
        
      </div>
    </div>
  )
}
