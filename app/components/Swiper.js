"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { carousels } from "../data/SampleData";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const Swiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carousels.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carousels.length) % carousels.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative my-5 w-2/3 mx-auto h-full sm:h-[16rem]   max-w -lg  overflow-hidden">
      <div className=" ">
        {carousels.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={1000}
            height={1000}
            className={`absolute inset-0 w-full h-full rounded-xl object-cover  transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Previous Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 m-2 hover:bg-opacity-75"
      >
        <SlArrowLeft  size={24}/>
      </button>

      {/* Next Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 m-2 hover:bg-opacity-75"
      >
        <SlArrowRight size={24}/>
      </button>
    </div>
  );
};

export default Swiper;
