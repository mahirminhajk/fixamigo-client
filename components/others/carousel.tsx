"use client";

import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import { useState } from "react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner1.png",
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner2.png",
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner3.png",
];

// Helper for auto-slide mutation plugin
const AutoplayPlugin: KeenSliderPlugin = (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;
  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 6000); // Auto-slide interval
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
      mode: "snap",
      slides: { perView: 1 },
    },
    [AutoplayPlugin]
  ); // Added AutoplayPlugin

  return (
    <div className="relative group">
      {" "}
      {/* Added group for arrow visibility on hover */}
      <div
        ref={sliderRef}
        className="keen-slider w-full h-[300px] md:h-[500px]"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="keen-slider__slide relative w-full h-full overflow-hidden"
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0} // Prioritize loading the first image
            />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <ArrowLeft
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            disabled={!instanceRef.current.options.loop && currentSlide === 0}
          />
          <ArrowRight
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            disabled={
              !instanceRef.current.options.loop &&
              currentSlide ===
                instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
    </div>
  );
}

function ArrowLeft(props: {
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label="Previous slide"
      className={`absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <ChevronLeft size={24} />
    </button>
  );
}

function ArrowRight(props: {
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label="Next slide"
      className={`absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <ChevronRight size={24} />
    </button>
  );
}
