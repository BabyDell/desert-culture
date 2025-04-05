"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import localFont from "next/font/local";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuPopup } from "./MenuPopUp";

const magioline = localFont({
  src: "../fonts/Magioline.ttf",
});

const Nirpa = localFont({
  src: "../fonts/Nirpa-2.ttf",
});

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 3 || scrollY - lastScrollY < -3)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
};

export default function Navbar() {
  const pathname = usePathname();
  const scrollPosition = useScrollPosition();
  const scrollDirection = useScrollDirection();
  const isScrolled = scrollPosition > 50;
  const isScrollingDown = scrollDirection === "down";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out shadow-lg `}
      >
        <div
          className={`bg-white transition-all duration-300 ease-in-out ${
            isScrolled ? "h-16" : "h-16 sm:h-24"
          }`}
        >
          <div className="mx-auto px-3 sm:px-4 h-full flex items-center justify-between text-black">
            <div className="flex-1 lg:block hidden" />
            <Link href="/" className="flex">
              <Image
                src="/img/CCAssets/CCMLogo.png"
                alt="California Culture Magazine"
                width={50}
                height={50}
                className="sm:mr-5 mr-1 w-10 h-10 sm:w-[50px] sm:h-[50px]"
              />
              <div className="flex lg:items-center space-x-4">
                <h1
                  className={` transition-all duration-300 ease-in-out mr-3 lg:mr-10 xl:mr-0 ${
                    magioline.className
                  } ${
                    isScrolled
                      ? "text-2xl sm:text-3xl mt-[0.45rem] sm:mt-[0.60rem] "
                      : "text-2xl sm:text-4xl xl:text-5xl mt-[0.45rem] "
                  }`}
                >
                  <div className="flex items-center">
                    {/* <Image
                    src="/img/CCAssets/Logo.jpg"
                    alt="California Culture Magazine"
                    width={50}
                    height={50}
                    className="mr-5 lg:hidden flex mb-2"
                  /> */}
                    {/* <span className="lg:contents hidden"> */}
                    <span className="mr-2 ">
                      <span className="font-semibold mr-2 ">DESERT</span>CULTURE
                    </span>
                    MAGAZINE
                  </div>
                </h1>
              </div>
            </Link>
            <div className="lg:hidden mt-2 sm:mt-1">
              <button
                className="inline-block cursor-pointer focus:outline-none m-auto"
                onClick={() => setIsMenuOpen((prevState) => !prevState)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <div
                  className={`w-[1.5rem] h-[2.5px] sm:w-7 sm:h-[3px] my-1.5 transition-transform duration-300 ${
                    isMenuOpen ? "transform translate-y-[9px] -rotate-45" : ""
                  } ${isScrolled ? "bg-black" : "bg-black"}`}
                />
                <div
                  className={`w-[1.5rem] h-[2.5px] sm:w-7 sm:h-[3px] my-1.5 transition-transform duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  } ${isScrolled ? "bg-black" : "bg-black"}`}
                />
                <div
                  className={`w-[1.5rem] h-[2.5px] sm:w-7 sm:h-[3px] my-1.5 transition-transform duration-300 ${
                    isMenuOpen ? "transform -translate-y-[9px] rotate-45" : ""
                  } ${isScrolled ? "bg-black" : "bg-black"}`}
                />
              </button>
            </div>
            <div className="flex-1  justify-end space-x-4 items-center hidden lg:flex">
              <Button
                variant="outline"
                className={`bg-black text-white text-3xl rounded-none ${Nirpa.className}`}
              >
                <span className="mt-1.5">Subscribe</span>
              </Button>
              <Button
                variant="ghost"
                className={`text-3xl mt-1.5 ${Nirpa.className}`}
              >
                <Link href="/auth/signup">SIGN IN</Link>
              </Button>
            </div>
          </div>
        </div>
        <div
          className={`bg-neutral-900 transition-all duration-300 ease-in-out hidden lg:block ${
            isScrollingDown ? "h-0 overflow-hidden" : "h-14"
          }`}
        >
          <div className="container mx-auto px-4 h-full flex items-center justify-center space-x-20">
            {/* <Link href="/" className="text-slate-50 hover:text-gray-600">
            Logo
          </Link> */}
            {/* <span className="mx-4 text-slate-50 transform -skew-x-12">/</span> */}
            {["LIFESTYLE", "EVENTS", "THINGS TO DO", "NEWS"].map(
              (item, index) => {
                const path =
                  item === "THINGS TO DO" ? "things-to-do" : item.toLowerCase();
                return (
                  <div key={index} className="flex items-center font-Poly mt-1">
                    <Link
                      href={`/articles/${path}`}
                      className={`text-white hover:text-gray-600 text-xl tracking-widest ${Nirpa.className}`}
                    >
                      {item}
                    </Link>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </nav>
      <div className="h-16 sm:h-24 lg:h-[9.5rem]"></div>
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
