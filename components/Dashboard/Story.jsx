import React from "react";

export default function Story({ isOpen }) {
  return (
    <div className="slider-container" style={{ zIndex: "9" }}>
      <div className={`slider ${isOpen ? "open" : ""}`}>
        <div className="slide">Slide 1</div>
        <div className="slide">Slide 2</div>
        <div className="slide">Slide 3</div>
      </div>
    </div>
  );
}
