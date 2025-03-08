"use client";

import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

const images = [
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner1.png",
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner2.png",
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner3.png",
];

export default function Carousel() {
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
  });

  // Auto-slide logic
  useEffect(() => {
    if (!slider) return;
    const interval = setInterval(() => {
      slider.current?.next(); // Move to the next slide
    }, 6000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div ref={sliderRef} className="keen-slider w-full h-[300px] md:h-[500px]">
      {images.map((src, index) => (
        <div
          key={index}
          className="keen-slider__slide relative w-full h-full overflow-hidden"
        >
          <Image
            src={src}
            alt={`Slide ${index}`}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}
