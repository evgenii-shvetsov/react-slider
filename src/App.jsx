import { useState } from 'react'
import './App.css'
import Carousel from './components/Carousel'

function App() {
  const [count, setCount] = useState(0)

    const slides = [
      {
        id: 1,
        image: "https://picsum.photos/200",
        title: "Slide 1",
        description: "This is the first slide",
      },
      {
        id: 2,
        image: "https://picsum.photos/201",
        title: "Slide 2",
        description: "This is the second slide",
      },
      {
        id: 3,
        image: "https://picsum.photos/202",
        title: "Slide 3",
        description: "This is the third slide",
      },
      {
        id: 4,
        image: "https://picsum.photos/203",
        title: "Slide 4",
        description: "This is the fourth slide",
      },
      {
        id: 5,
        image: "https://picsum.photos/204",
        title: "Slide 5",
        description: "This is the fifth slide",
      },
      {
        id: 6,
        image: "https://picsum.photos/205",
        title: "Slide 6",
        description: "This is the sixt slide",
      },
    ];

  return (
    <div className="App">
      <Carousel slides={slides} />
    </div>
  )
}

export default App
