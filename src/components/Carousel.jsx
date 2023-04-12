import React, { useState, useRef } from "react";
import DoublyLinkedList from "./DoublyLinkedList";
import "./Carousel.css";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [list, setList] = useState(new DoublyLinkedList());


  useState(() => {
    const newList = new DoublyLinkedList();
    slides.forEach((slide) => {
      newList.append(slide);
    });
    setList(newList);
  }, [slides]);

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      if (list && list.next) {
        setList(list.next());
      }
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      if (list && list.prev) {
        setList(list.prev());
      }
    }
  };



  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={goToPrevSlide} className="prev-button">
          Prev
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {slides.slice(currentSlide, currentSlide + 3).map((slide, index) => (
            <div key={index} className="slide">
              <img
                src={slide.image}
                alt={slide.title}
                style={{ marginRight: "10px" }}
              />
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          ))}
        </div>
        <button onClick={goToNextSlide} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
