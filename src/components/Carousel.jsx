import React, { useState, useRef, useEffect } from "react";
import DoublyLinkedList from "./DoublyLinkedList";
import "./Carousel.css";

const Carousel = ({ slides }) => {
  const [currentNode, setCurrentNode] = useState(null);
  const doublyLinkedList = useRef(new DoublyLinkedList());

  useEffect(() => {
    slides.forEach((slide) => {
      doublyLinkedList.current.appendNode(slide);
    });
    setCurrentNode(doublyLinkedList.current.head);
  }, [slides]);

  console.log(currentNode);

  const goToNextSlide = () => {
    if (currentNode && currentNode.next) {
      setCurrentNode(currentNode.next);
    } else {
      setCurrentNode(doublyLinkedList.current.head);
    }
  };

  const goToPrevSlide = () => {
    if (currentNode && currentNode.prev) {
      setCurrentNode(currentNode.prev);
    } else {
      let lastNode = doublyLinkedList.current.head;
      while (lastNode && lastNode.next) {
        lastNode = lastNode.next;
      }
      setCurrentNode(lastNode);
    }
  };

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button onClick={goToPrevSlide} className="prev-button">
          Prev
        </button>
        {currentNode &&
          currentNode.data && ( 
            <>
              <div className="carousel-item">
                <img
                  src={currentNode.data.image}
                  alt={currentNode.data.title}
                />
                <h3>{currentNode.data.title}</h3>
                <p>{currentNode.data.description}</p>
              </div>

              {currentNode.next &&
                currentNode.next.data && ( 
                  <div className="carousel-item">
                    <img
                      src={currentNode.next.data.image}
                      alt={currentNode.next.data.title}
                    />
                    <h3>{currentNode.next.data.title}</h3>
                    <p>{currentNode.next.data.description}</p>
                  </div>
                )}
            </>
          )}
        <button onClick={goToNextSlide} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;

