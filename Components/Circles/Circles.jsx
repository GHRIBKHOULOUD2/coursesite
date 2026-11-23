import React, { useState, useEffect, useRef } from "react";

function Circles() {
  const circleSize = 40; 
  const containerHeight = 0.3 * window.innerHeight; 
  const containerWidth = window.innerWidth;

 
  const colors = ["#D8E2DC", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#9D8189"];


  const [circles, setCircles] = useState(
    Array.from({ length: 100 }, () => ({
      top: Math.random() * (containerHeight - circleSize) + "px",
      left: Math.random() * (containerWidth - circleSize) + "px",
      borderColor: colors[Math.floor(Math.random() * colors.length)],
    }))
  );

  const circleStyle = {
    width: `${circleSize}px`,
    height: `${circleSize}px`,
    borderRadius: "50%",
    background: "white",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    position: "absolute",
    transition: "top 0.8s ease, left 0.8s ease, transform 0.4s ease",
    cursor: "pointer",
  };

 
  const moveCircle = (index) => {
    setCircles((prev) =>
      prev.map((circle, i) =>
        i === index
          ? {
              ...circle,
              top: Math.random() * (containerHeight - circleSize) + "px",
              left: Math.random() * (containerWidth - circleSize) + "px",
              borderColor: colors[Math.floor(Math.random() * colors.length)],
            }
          : circle
      )
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "30vh",
        background: "white",
        overflow: "hidden",
      }}
    >
      {circles.map((circle, index) => (
        <div
          key={index}
          style={{
            ...circleStyle,
            top: circle.top,
            left: circle.left,
            border: `2px solid ${circle.borderColor}`,
          }}
          onMouseEnter={(e) => {
            moveCircle(index);
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        ></div>
      ))}
    </div>
  );
}

export default Circles;
