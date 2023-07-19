import React from "react";

const Arrow = () => {
  const style = {
    position: "absolute",
    top: "35px",
    left: "89%",
    transform: "translateX(-80%)",
    width: "0",
    height: "0",
    borderLeft: "18px solid transparent",
    borderRight: "18px solid transparent ",
    borderBottom: "42px solid #00A987",
    zIndex: "9999",
  };

  return <div style={style}></div>;
};

export default Arrow;