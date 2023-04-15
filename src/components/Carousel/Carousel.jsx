import React, { useState, useRef, useEffect } from "react";
import DoublyLinkedList from "./DoublyLinkedList";
import "./Carousel.css";

const Carousel = ({ slides }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const doublyLinkedList = useRef(new DoublyLinkedList());

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const loadAllImages = async () => {
    try {
      await Promise.all(slides.map((slide) => loadImage(slide.image)));
      setIsLoading(false);
      setCurrentNode(doublyLinkedList.current.head.next);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  useEffect(() => {
    slides.forEach((slide) => {
      doublyLinkedList.current.appendNode(slide);
    });

    if (doublyLinkedList.current.head) {
      doublyLinkedList.current.head.prev =
        doublyLinkedList.current.head.prev || doublyLinkedList.current.tail;
      doublyLinkedList.current.tail.next =
        doublyLinkedList.current.tail.next || doublyLinkedList.current.head;
    }

    loadAllImages();
  }, [slides]);

  const navigate = (direction) => {
    if (isNavigating) return;
    setIsNavigating(true);

    setCurrentNode((current) => {
      if (!current) return null;
      if (direction === "next") {
        return current.next || doublyLinkedList.current.head;
      } else if (direction === "prev") {
        return current.prev || doublyLinkedList.current.tail;
      }
    });

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
      return { transform: "translateY(150%)" };
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
      {isLoading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <>
          <button
            onClick={() => navigate("prev")}
            className="prev-button"
            disabled={isNavigating}
          >
            ←
          </button>

          <div className="carousel-container">{renderSlides()}</div>

          <button
            onClick={() => navigate("next")}
            className="next-button"
            disabled={isNavigating}
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
