"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const images = [
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner1.png",
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner4.webp",
  "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner3.png",
];

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Custom autoplay functionality
  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      if (autoplayRef.current) return;
      autoplayRef.current = setInterval(() => {
        api.scrollNext();
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    // Set up event listeners
    const container = api.containerNode();
    if (container) {
      container.addEventListener("mouseenter", stopAutoplay);
      container.addEventListener("mouseleave", startAutoplay);
    }

    // Start autoplay initially
    startAutoplay();

    // Cleanup
    return () => {
      stopAutoplay();
      if (container) {
        container.removeEventListener("mouseenter", stopAutoplay);
        container.removeEventListener("mouseleave", startAutoplay);
      }
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-[1920/600] max-h-[400px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[550px] xl:max-h-[600px] overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={`Banner ${index + 1} - Fixamigo mobile repair services`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
        <CarouselPrevious className="hidden md:flex left-4 size-12 bg-black/60 hover:bg-black/80 border-none text-white shadow-lg backdrop-blur-sm" />
        <CarouselNext className="hidden md:flex right-4 size-12 bg-black/60 hover:bg-black/80 border-none text-white shadow-lg backdrop-blur-sm" />
      </Carousel>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-primary w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
