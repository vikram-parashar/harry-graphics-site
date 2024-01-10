"use client"
import Image from "next/image";

const images = [
  "/slides/one.jpg",
  "/slides/two.jpg",
  "/slides/three.jpg",
  "/slides/four.jpg",
];

import { useState, useEffect } from "react";

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change images every 3 seconds (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative h-[600px] w-screen overflow-hidden bg-oceanLight md:h-[640px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transform ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <Image
            src={image}
            alt="Slideshow image"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
