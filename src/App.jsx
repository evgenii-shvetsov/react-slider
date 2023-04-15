import { useState } from "react";
import "./App.css";
import Carousel from "./components/Carousel/Carousel";
import slides from "./components/Carousel/dataSlides";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Carousel slides={slides} />
      <Footer />
    </div>
  );
}

export default App;
