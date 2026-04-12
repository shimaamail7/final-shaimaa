"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/showreel", label: "ShowReel" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/try", label: "Try" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is approximately 100vh.
      // We switch to "dark bg / white text" theme once we scroll past it.
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll() // Initial check
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const textColorClass = "text-black"
  const bgColorClass = "bg-white"

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-colors duration-500 ${bgColorClass} `}>
      <nav className={`mx-auto flex h-16 max-w-[2560px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 ${textColorClass}`}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
          }}
          className={`text-lg font-normal tracking-tight sm:text-xl transition-opacity hover:opacity-70 ${textColorClass}`}
        >
          Optika
        </Link>

        {/* Desktop Navigation - Center */}
        <ul className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-opacity hover:opacity-70 font-inter font-normal tracking-[0.02em] ${textColorClass}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Partners Link - Desktop */}
        <Link
          href="/partners"
          className={`hidden transition-opacity hover:opacity-70 md:block font-inter font-normal tracking-[0.02em] ${textColorClass}`}
        >
          /For Partners
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 transition-opacity hover:opacity-70 md:hidden ${textColorClass}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`transform overflow-hidden transition-all duration-300 ease-in-out md:hidden ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="border-t border-gray-100 bg-white px-4 py-4 sm:px-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-black transition-colors hover:text-gray-600"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "150%",
                    letterSpacing: "0.02em"
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100 pt-4">
              <Link
                href="/partners"
                className="block text-black transition-colors hover:text-gray-600"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "150%",
                  letterSpacing: "0.02em"
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                /For Partners
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
