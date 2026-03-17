"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const ImageCarousel = ({ carousels = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ playOnInit: true, delay: 5000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  if (!carousels.length) return null;

  return (
    <>
      <style>{`
        .carousel-root {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 1.5rem 0 2.5rem;
        }
        .carousel-viewport {
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,.18);
        }
        .carousel-track {
          display: flex;
          touch-action: pan-y;
        }
        .carousel-slide {
          flex: 0 0 100%;
          min-width: 0;
          position: relative;
        }
        .carousel-slide a {
          display: block;
          width: 100%;
        }
        .carousel-img {
          width: 100%;
          height: auto;
          max-height: 440px;
          object-fit: cover;
          display: block;
          border-radius: 20px;
        }

        /* gradient shimmer on the image */
        .carousel-slide::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(to top, rgba(12,8,30,.35) 0%, transparent 50%);
          pointer-events: none;
        }

        /* nav arrows */
        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 42px; height: 42px;
          border-radius: 50%;
          border: none; cursor: pointer;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 16px rgba(0,0,0,.18);
          display: flex; align-items: center; justify-content: center;
          color: #0c0c1a;
          transition: background .18s, transform .14s, box-shadow .18s;
          padding: 0;
        }
        .carousel-btn:hover {
          background: #fff;
          box-shadow: 0 6px 22px rgba(0,0,0,.25);
          transform: translateY(-50%) scale(1.06);
        }
        .carousel-btn:active { transform: translateY(-50%) scale(.97); }
        .carousel-btn.prev { left: -18px; }
        .carousel-btn.next { right: -18px; }

        /* dots */
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: .5rem;
          margin-top: 1.1rem;
        }
        .carousel-dot {
          border: none; cursor: pointer;
          padding: 0;
          background: #d0ccc4;
          border-radius: 999px;
          height: 7px;
          transition: width .3s cubic-bezier(.34,1.56,.64,1), background .25s;
          width: 7px;
        }
        .carousel-dot.active {
          background: #c8851f;
          width: 26px;
        }
      `}</style>

      <div className="carousel-root">
        {/* viewport */}
        <div className="carousel-viewport" ref={emblaRef}>
          <div className="carousel-track">
            {carousels.map((image, index) => (
              <div className="carousel-slide" key={index}>
                {image.link ? (
                  <Link href={image.link}>
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={900}
                      height={440}
                      className="carousel-img"
                      priority={index === 0}
                    />
                  </Link>
                ) : (
                  <Image
                    src={image.src}
                    alt={image.title}
                    width={900}
                    height={440}
                    className="carousel-img"
                    priority={index === 0}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* prev / next */}
        <button
          className="carousel-btn prev"
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="carousel-btn next"
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* dot indicators */}
        <div className="carousel-dots" role="tablist">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === selectedIndex}
              className={`carousel-dot${i === selectedIndex ? " active" : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
