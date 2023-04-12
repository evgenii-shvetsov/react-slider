import React, { useState } from "react";
import DoublyLinkedList from "./DoublyLinkedList"; 

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
    <div>
      <button onClick={goToPrevSlide}>Prev</button>
      <div>
        {slides.slice(currentSlide, currentSlide + 2).map((slide, index) => (
          <div key={index}>
            <img src={slide.image} alt={slide.title} />
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </div>
        ))}
      </div>
      <button onClick={goToNextSlide}>Next</button>
    </div>
  );
};

export default Carousel