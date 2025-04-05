"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample gallery images - replace with your actual images
const galleryImages = [
  {
    src: "/img/articles/CotinoDisney/CotinoDisneyCover.jpg",
    alt: "Gallery image 1",
    caption: "Explore beautiful landscapes",
  },
  {
    src: "/img/articles/EggPrices/Cover.jpg",
    alt: "Gallery image 2",
    caption: "Discover hidden gems",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 3",
    caption: "Experience new adventures",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 4",
    caption: "Capture memorable moments",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Gallery image 5",
    caption: "Find inspiration everywhere",
  },
];

export default function PhotoGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const openGallery = () => {
    setIsOpen(true);
    setCurrentIndex(0);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="">
      {/* Cover image that acts as a button */}
      <div
        className="bg-white p-4 rounded-lg shadow-md cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
        onClick={openGallery}
      >
        <div className="relative w-[300px] h-[200px] mb-3 overflow-hidden rounded-md">
          <Image
            src={galleryImages[0].src || "/placeholder.svg"}
            alt={galleryImages[0].alt}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-center group-hover:underline">
          Photo Gallery
        </h3>
        <p className="text-gray-600 text-sm text-center mt-1">
          Take a Look at the Beautiful Coachella Valley
        </p>
      </div>    
      {/* Gallery modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
              onClick={closeGallery}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close gallery</span>
            </Button>

            {/* Image container */}
            <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
              <Image
                src={galleryImages[currentIndex].src || "/placeholder.svg"}
                alt={galleryImages[currentIndex].alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Image title */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <h3 className="text-white text-xl font-medium bg-black/50 inline-block px-4 py-2 rounded-lg">
                {galleryImages[currentIndex].caption}
              </h3>
            </div>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>   

            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
