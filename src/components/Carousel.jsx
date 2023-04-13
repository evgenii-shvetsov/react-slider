import React, { useState, useRef, useEffect } from "react";
import DoublyLinkedList from "./DoublyLinkedList";
import "./Carousel.css";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [list, setList] = useState(null);
//   const slideContainerRef = useRef(null);

  useEffect(() => {
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
    } else {
      setCurrentSlide(0); // Reset to first slide when reaching the end
      setList(list && list.head); // Reset list to head when reaching the end
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      if (list && list.prev) {
        setList(list.prev());
      }
    } else {
      setCurrentSlide(slides.length - 1); // Reset to last slide when reaching the beginning
      setList(list && list.tail); // Reset list to tail when reaching the beginning
    }
  };


  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>
        <button
          onClick={goToPrevSlide}
          className="prev-button"
          
        >
          Prev
        </button>
        <div
          //   ref={slideContainerRef}
          className="slideContainer"
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
        <button
          onClick={goToNextSlide}
          className="next-button"
     
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;


