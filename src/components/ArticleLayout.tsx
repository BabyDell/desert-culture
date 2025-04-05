'use client'
import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ArticleLayoutProps {
  children: ReactNode
  type: string
  navLinks?: { href: string; label: string }[]
}

export default function ArticleLayout({ children, type, navLinks }: ArticleLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-2">
          <h1 className="text-6xl text-black font-magioline capitalize">{type}</h1>
        </div>
        <hr className="border-t-2 border-black w-full mb-4" />
        {navLinks && (
          <nav className="mb-6">
            <ul className="flex space-x-4 md:justify-normal justify-center flex-wrap">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-black hover:text-gray-600 text-xl font-Playfair ${pathname === link.href ? "underline" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {children}
      </div>
    </div>
  )
}