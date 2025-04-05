import Headline from "@/components/Headline";
import HomeArticlesByType from "@/components/HomeArticlesByType";
import Link from "next/link";
import Image from "next/image";
import PhotoGallery from "@/components/photo-gallery";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <Headline />
      <div className="mx-5 sm:mx-10 space-y-10 my-10">
        <HomeArticlesByType type="shopping" />
        <HomeArticlesByType type="career" />
        <HomeArticlesByType type="event" />

        <div className="mb-2">
      </div>
      <hr className="border-t-2 border-black w-full mb-2" />
      <hr className="border-t-2 border-black w-full mb-2" />

        <h1 className="text-3xl text-black font-magioline capitalize">
          Unwind <span className="text-xl font-magioline">with Wordle & Gallery</span>
        </h1>
        <div className="flex justify-center items-center gap-10">
          <PhotoGallery />

          <Link
            href="/wordle"
            className="group transition-transform hover:scale-105"
          >
            <div className="p-4 rounded-lg shadow-md">
              <div className="relative w-[300px] h-[200px] mb-3 overflow-hidden rounded-md">
                <Image
                  src="/img/CCAssets/Wordle.png"
                  alt="Wordle Game"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center group-hover:underline">
                Play Wordle
              </h3>
              <p className="text-gray-600 text-sm text-center mt-1">
                Test your vocabulary with our daily word puzzle
              </p>
            </div>
          </Link>
        </div>
      <hr className="border-t-2 border-black w-full mb-2" />
      <hr className="border-t-2 border-black w-full mb-2" />

      </div>
    </div>
  );
}
