const images = [
  "https://i.imgur.com/1u6NY7l.jpg",
  "https://i.imgur.com/sWeXAOP.jpg",
  "https://i.imgur.com/tJcPgxL.jpg",
  "https://i.imgur.com/vqFUZbs.jpg",
];

import { useState, useEffect } from "react";

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Automatically advance the slideshow
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change images every 3 seconds (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative mt-20 h-[600px] w-screen overflow-hidden bg-oceanLight md:h-[640px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transform ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
