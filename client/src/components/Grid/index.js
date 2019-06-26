import React from "react";

const box = {
  marginTop: '1.5%',
  marginRight: '0.75%',
  marginBottom: '0%',
  marginLeft: '0.75%',
  cursor: 'pointer',

}

const imgWrapper = {}

function Grid(props) {
  return (
    <a href={"/" + props.link}>
    <img src={props.filePath} className="rounded-lg" style={box}  alt=""/>{props.link}
    </a>
  )
}

export default Grid;
