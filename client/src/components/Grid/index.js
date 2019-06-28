import React from "react";

const box = {
  marginTop: '1.5%',
  marginRight: '0.75%',
  marginBottom: '0%',
  marginLeft: '0.75%',
  cursor: 'pointer',

}

//Will need to wrap this in a flexbox div

function Grid(props) {
  return (
    <a href={"/" + props.link}>
    <img src={props.filePath} className="rounded-sm" style={box}  alt=""/>{props.name}
    </a>
  )
}

export default Grid;
