import React from "react";
import './TrafficIconsTriangle.css';

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
      height={height}

      className={className}
      viewBox="0 0 20 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="5.5,2.5 2.5,8 8,8"  fill="none" r="2.5" stroke={props.fill} strokeWidth="2">
        <animate attributeName="r" from="1" to="4" dur="3s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" dur="3s" begin="0s" repeatCount="indefinite" />
      </polygon> 
      <polygon points="5.5,2.5 2.5,8 8,8" cx="5" cy="5" fill = {props.fill} r="2.5" />

    </svg>
  );


export default TrafficIcons;
