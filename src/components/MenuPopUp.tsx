"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import localFont from "next/font/local"

const Nirpa = localFont({
  src: "../fonts/Nirpa-2.ttf",
})

interface MenuPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function MenuPopup({ isOpen, onClose }: MenuPopupProps) {
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      className="fixed top-0 right-0 bottom-0 w-full bg-neutral-900 z-50 flex flex-col items-center justify-center"
    >
      <button onClick={onClose} className="absolute top-5 right-5 text-white text-4xl">
        &times;
      </button>
      <nav className="flex flex-col items-center space-y-6">
        {["LIFESTYLE", "EVENTS", "THINGS TO DO", "NEWS"].map((item) => (
          <Link
            key={item}
            href={`/articles/${item.toLowerCase()}`}
            className={`text-white hover:text-gray-300 text-3xl tracking-widest ${Nirpa.className}`}
            onClick={onClose}
          >
            {item}
          </Link>
        ))}
      </nav>
      <div className="mt-8 space-x-4">
        <Button variant="outline" className={`bg-white text-black text-2xl rounded-none ${Nirpa.className}`}>
          <span className="mt-1.5">Subscribe</span>
        </Button>
        <Button variant="ghost" className={`text-white text-2xl mt-1.5 ${Nirpa.className}`} onClick={onClose}>
          <Link href="/auth/signup">SIGN IN</Link>
        </Button>
      </div>
    </motion.div>
  )
}

