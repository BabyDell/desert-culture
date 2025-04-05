import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import localFont from "next/font/local";

const Nirpa = localFont({
  src: "../fonts/Nirpa-2.ttf",
});

const magioline = localFont({
  src: "../fonts/Magioline.ttf",
});

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and social links */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex">
              <Image
                src="/img/CCAssets/CCMLogo.png"
                alt="California Culture Magazine"
                width={100}
                height={100}
                className="mb-2 mr-5"
              />
              <h2
                className={`${magioline.className} text-4xl tracking-wider m-auto`}
              >
                <span className="font-semibold">
                  CALIFORNIA
                  <br />{" "}
                </span>
                CULTURE MAGAZINE
              </h2>
            </div>
            <div className="flex space-x-4 mt-3">
              <Link href="#" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube />
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          <div className="grid grid-cols-2 md:gap-x-20 lg:gap-x-32  gap-x-10 gap-y-5 mx-auto">
            {[
              "LIFESTYLE",
              "EVENTS",
              "THINGS TO DO",
              "NEWS",
              "NEWSLETTER",
              "CONTACT US",
              "SUBSCRIBE",
              "ADVERTISE",
            ].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={`${Nirpa.className} text-lg tracking-widest hover:text-gray-300`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Newsletter signup */}
        </div>
        <div className="mt-8 text-center text-white font-magioline  ">
          © 2025{" "}
          <Link
            href="https://www.andyfelix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Andy Felix
          </Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
