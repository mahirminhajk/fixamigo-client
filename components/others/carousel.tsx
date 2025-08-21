"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    src: "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner1.webp",
    href: "/repair/mobile-phone",
    label: "Explore mobile and laptop repair services",
  },
  {
    src: "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner2.webp",
    href: "/brands",
    label: "Browse supported brands and models",
  },
  {
    src: "https://fixamigo.s3.ap-south-1.amazonaws.com/b/banner3.webp",
    href: "/repair",
    label: "Submit a support or custom service request",
  },
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
        className="w-full xl:px-16 2xl:px-24"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-[16/9] md:aspect-[8/3] max-h-[400px] sm:max-h-[450px] md:max-h-[500px] lg:max-h-[550px] xl:max-h-[600px] overflow-hidden rounded-3xl">
                <Image
                  src={slide.src}
                  alt={`Banner ${index + 1} - Fixamigo mobile repair services`}
                  title={`Banner ${
                    index + 1
                  } - Fixamigo mobile repair services`}
                  fill
                  className="object-cover xl:object-contain object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, (max-width: 1600px) 100vw, 1600px"
                  quality={85}
                  priority={index === 0}
                />
                {/* Full-slide clickable overlay without visual changes */}
                <Link
                  href={slide.href}
                  aria-label={slide.label}
                  className="absolute inset-0"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows removed as requested */}
      </Carousel>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
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
