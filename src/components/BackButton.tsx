"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto mt-4 flex">

      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center font-Poly group"
      >
      <ArrowLeft className="text-blue-600 hover:text-blue-800  h-4 w-4 transition-transform duration-300 ease-in-out group-hover:-translate-x-1 my-auto mr-1.5" />

        Back
      </button>
    </div>
  );
}
