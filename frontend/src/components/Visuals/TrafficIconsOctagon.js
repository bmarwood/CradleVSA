import React from "react";
import './TrafficIconsOctagon.css';

const TrafficIcons = (props, {
  name = "",
  style = {
  },
  fill = "#000",
  viewBox = "",
  width = "10%",
  className = "",
  height = "75%"
}) => (
    <svg
      width="40"
      style={props.style}
      height="30"

      className={className}
      viewBox="-1 0 20 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon transform="translate(-2,0)" points=" 2.5 2.5,5 0,7.5 0,10 2.5,10 5,7.5 7.5,5 7.5,2.5 5,2.5 2.5" fill="none" r="2.5" stroke={props.fill} strokeWidth="2">
        <animate attributeName="r" from="1" to="4" dur="2.5s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" dur="2.5s" begin="0s" repeatCount="indefinite" />
      </polygon>
      <polygon transform="translate(-2,0)" points=" 2.5 2.5,5 0,7.5 0,10 2.5,10 5,7.5 7.5,5 7.5,2.5 5,2.5 2.5" cx="5" cy="5" fill={props.fill} r="2.5" />

    </svg>
  );


export default TrafficIcons;
