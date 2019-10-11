import React from "react";

const getSpeed = name => {
  switch (name) {
    case "greencircle":
      return "1.5s";
    case "redcircle":
      return "4s";
    case "yellowcircle":
      return "2s";
    default:
      return "1.5s";
  }
};

const TrafficIcons =  (props, {
  name = "",
  style = {},
  fill = "#000",
  viewBox = "",
  width = "100%",
  className = "",
  height = "50%"
}) => (
    <svg
      width={width}
      style={props.style}
      height= {height}
      className={className}
      viewBox={"0 0 18 10"}
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" fill="none" r="2.5" stroke={props.fill} stroke-width="2">
        <animate attributeName="r" from="1" to="4" dur="3s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" dur="3s" begin="0s" repeatCount="indefinite" />
      </circle>
      <circle cx="5" cy="5" fill = {props.fill} r="2.5" />
    </svg>
  );


export default TrafficIcons;
