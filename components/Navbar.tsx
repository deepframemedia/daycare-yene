"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md"
            style={{ background: "linear-gradient(135deg, #ff6b47, #ff4d8d)" }}
          >
            D
          </div>
          <span
            className="text-xl font-black"
            style={{
              fontFamily: "var(--font-nunito)",
              background: "linear-gradient(135deg, #ff6b47, #ff4d8d)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Daycare
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold text-gray-600 hover:text-[#ff6b47] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            className="px-5 py-2.5 text-sm font-bold text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #ff6b47, #ff4d8d)" }}
          >
            Inscribirse
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-gray-700 hover:text-[#ff6b47] transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="px-5 py-3 text-center text-white font-bold rounded-full"
            style={{ background: "linear-gradient(135deg, #ff6b47, #ff4d8d)" }}
          >
            Inscribirse
          </a>
        </div>
      )}
    </header>
  );
}
