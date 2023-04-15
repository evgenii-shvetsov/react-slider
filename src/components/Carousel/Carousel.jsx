import React, { useState, useRef, useEffect } from "react";
import DoublyLinkedList from "./DoublyLinkedList";
import "./Carousel.css";

const Carousel = ({ slides }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const doublyLinkedList = useRef(new DoublyLinkedList());

  //   useEffect(() => {
  //     slides.forEach((slide) => {
  //       doublyLinkedList.current.appendNode(slide);
  //     });

  //     if (doublyLinkedList.current.head) {
  //       doublyLinkedList.current.head.prev =
  //         doublyLinkedList.current.head.prev || doublyLinkedList.current.tail;
  //       doublyLinkedList.current.tail.next =
  //         doublyLinkedList.current.tail.next || doublyLinkedList.current.head;
  //         setCurrentNode(doublyLinkedList.current.head.next);
  //     }
  //   }, [slides]);

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

    loadAllImages();
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
            onClick={goToPrevSlide}
            className="prev-button"
            disabled={isNavigating}
          >
            ←
          </button>

          <div className="carousel-container">{renderSlides()}</div>

          <button
            onClick={goToNextSlide}
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
