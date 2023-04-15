import React, { useState, useRef, useEffect } from "react";
import DoublyLinkedList from "./DoublyLinkedList";
import "./Carousel.css";

const Carousel = ({ slides }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const doublyLinkedList = useRef(new DoublyLinkedList());

useEffect(() => {
  slides.forEach((slide) => {
    doublyLinkedList.current.appendNode(slide);
  });

  if (doublyLinkedList.current.head) {
    doublyLinkedList.current.head.prev =
      doublyLinkedList.current.head.prev || doublyLinkedList.current.tail;
    doublyLinkedList.current.tail.next =
      doublyLinkedList.current.tail.next || doublyLinkedList.current.head;
    setCurrentNode(doublyLinkedList.current.head.next);
  }
}, [slides]);


  const goToNextSlide = async () => {
    if (isNavigating) return;
    setIsNavigating(true);
    if (currentNode && currentNode.next) {
      setCurrentNode(currentNode.next);
    } else {
      setCurrentNode(doublyLinkedList.current.head);
    }
    setIsNavigating(false);
  };

const goToPrevSlide = () => {
  if (isNavigating) return;
  setIsNavigating(true);

  if (currentNode && currentNode.prev) {
    setCurrentNode(currentNode.prev);
  } else {
    setCurrentNode(doublyLinkedList.current.tail);
  }

  setIsNavigating(false);
};

const getSlideStyle = (node, currentNode) => {
  if (node === currentNode) {
    return { transform: "translateX(0)", zIndex: 2 };
  } else if (
    node === currentNode.prev ||
    (node.next === currentNode && node.prev === null)
  ) {
    return { transform: "translateX(-100%)", zIndex: 1 };
  } else if (
    node === currentNode.next ||
    (node.prev === currentNode && node.next === null)
  ) {
    return { transform: "translateX(100%)", zIndex: 1 };
  } else {
    return { transform: "translateX(-300%)" }; // Move the other slides off-screen
  }
};

const renderSlides = () => {
  let slidesToRender = [];
  let currentNodeToRender = doublyLinkedList.current.head;
  let index = 0;

  if (currentNodeToRender) {
    do {
      let style = getSlideStyle(currentNodeToRender, currentNode);

      slidesToRender.push(
        <div
          key={`${currentNodeToRender.data.title}-${index}`}
          className="carousel-item"
          style={style}
        >
          <img
            src={currentNodeToRender.data.image}
            alt={currentNodeToRender.data.title}
          />
          <h3>{currentNodeToRender.data.title}</h3>
          <p>{currentNodeToRender.data.description}</p>
        </div>
      );
      currentNodeToRender = currentNodeToRender.next;
      index++;
    } while (currentNodeToRender !== doublyLinkedList.current.head);
  }

  return slidesToRender;
};


  return (
    <div className="carousel-wrapper">
      <button
        onClick={goToPrevSlide}
        className="prev-button"
        disabled={isNavigating}
      >
        Prev
      </button>

      <div className="carousel-container">{renderSlides()}</div>

      <button
        onClick={goToNextSlide}
        className="next-button"
        disabled={isNavigating}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
