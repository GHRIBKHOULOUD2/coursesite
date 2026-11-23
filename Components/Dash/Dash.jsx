import React from "react";

function Dash1() {
  const cards = [
    { color: "#D8E2DC", text: "Total course", number: "9" },
    { color: "#FFE5D9", text: "Completed course", number: "4" },
    { color: "#FFCAD4", text: "In progress", number: "5" },
    { color: "#F4ACB7", text: "Total notes", number: "7" },
  ];

  const cardStyle = {
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
    cursor: "pointer",
    perspective: "1000px", 
  };

  const cardInnerStyle = {
    transition: "transform 0.4s ease",
    transformStyle: "preserve-3d",
  };

  return (
    <div style={{ padding: "2vw" }}>
      <div style={{ marginBottom: "3vh" }}>
        <h2 style={{ color: "#9D8189" }} className="fw-bold">
          Welcome Back
        </h2>
        <p style={{ marginTop: "5vh" }} className="fs-5">
          Here's a quick overview of your current course progress and achievements.
        </p>
      </div>

      <div
        className="row"
        style={{
          minHeight: "35vh",
          gap: "2vw",
          marginBottom: "3vh",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            style={{
              ...cardStyle,
              backgroundColor: card.color,
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              flex: "1",
              width: "15vw",
              margin: "2vw",
            }}
            onMouseMove={(e) => {
              const cardRect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - cardRect.left;
              const y = e.clientY - cardRect.top;
              const rotateX = ((y / cardRect.height) - 0.5) * 15; 
              const rotateY = ((x / cardRect.width) - 0.5) * 15; 
              e.currentTarget.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
              e.currentTarget.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0,0,0,0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
            }}
          >
            <div className="card-body" style={cardInnerStyle}>
              <p
                className="card-text"
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  textAlign: "center",
                  paddingTop: "2vh",
                }}
              >
                {card.text}
              </p>

              <p
                className="card-text fs-1"
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: "5vh",
                }}
              >
                {card.number}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dash1;
