"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  isSignUp: boolean;
}

export function ImageCarousel({ isSignUp }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images for the carousel
  const carouselImages = [
    {
      src: "/astore.jpg",
      alt: "Welcome to our platform",
      title: isSignUp ? "Join Our Community" : "Welcome Back!",
      description: isSignUp
        ? "Start your journey with us today and unlock amazing features"
        : "We're excited to see you again. Sign in to continue your journey",
    },
    {
      src: "/baldiyat.jpg",
      alt: "Secure and reliable platform",
      title: isSignUp ? "Secure & Reliable" : "Your Data is Safe",
      description: isSignUp
        ? "Built with security and reliability at its core for your peace of mind"
        : "Advanced security measures to keep your information protected",
    },
    {
      src: "/naltar.jpg",
      alt: "Amazing features",
      title: isSignUp ? "Amazing Features" : "Powerful Tools",
      description: isSignUp
        ? "Discover powerful tools and features designed to enhance your experience"
        : "Access all the tools you need to achieve your goals",
    },
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Handle dot click
  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentImage = carouselImages[currentImageIndex];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Carousel Images */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0 z-0"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center text-white p-8">
        <h2 className="text-3xl font-bold mb-4 transition-all duration-500">
          {currentImage.title}
        </h2>
        <p className="text-lg opacity-90 max-w-sm mx-auto transition-all duration-500">
          {currentImage.description}
        </p>

        {/* Carousel Dots */}
        <div className="mt-8 flex justify-center space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                index === currentImageIndex
                  ? "bg-white shadow-lg"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-32 mx-auto bg-white/20 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-4000 ease-linear"
            style={{
              width: `${
                ((currentImageIndex + 1) / carouselImages.length) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
