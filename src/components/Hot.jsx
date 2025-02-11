import { useState, useRef } from "react";
import Button from "./Button";
import "./Hot.css";

const Hot = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const totalSlides = 5; // 슬라이드 개수
  const slideWidth = 400; // 슬라이드 하나의 너비

  const updateSlidePosition = () => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${
        -currentIndex * slideWidth
      }px)`;
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="Hot">
      <h2>급구</h2>
      <div className="slider-container">
        <div
          className="slider"
          ref={sliderRef}
          style={{
            transform: `translateX(${-currentIndex * slideWidth}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <div className="slide">1</div>
          <div className="slide">2</div>
          <div className="slide">3</div>
          <div className="slide">4</div>
          <div className="slide">5</div>
        </div>
      </div>

      <div className="buttons">
        <Button onClick={prevSlide} text={"이전"} />
        <Button onClick={nextSlide} text={"다음"} />
      </div>
    </div>
  );
};

export default Hot;
