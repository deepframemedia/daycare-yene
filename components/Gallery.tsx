"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ZoomIn } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    alt: "Niños aprendiendo juntos",
    span: "md:col-span-2 md:row-span-2",
    color: "#ff6b47",
  },
  {
    src: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=500&q=80",
    alt: "Juego creativo en aula",
    color: "#4ecdc4",
  },
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80",
    alt: "Actividades escolares",
    color: "#a855f7",
  },
  {
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80",
    alt: "Juego al aire libre",
    color: "#22c55e",
  },
  {
    src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&q=80",
    alt: "Arte y manualidades",
    color: "#f59e0b",
  },
  {
    src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
    alt: "Lectura en grupo",
    span: "md:col-span-2",
    color: "#ff4d8d",
  },
  {
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80",
    alt: "Nutrición y meriendas",
    color: "#06b6d4",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-header", {
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".gal-item", {
        scale: 0.85, opacity: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.2)",
        scrollTrigger: { trigger: ".gallery-masonry", start: "top 78%" },
      });
    }, sectionRef);

    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handleKey);
    return () => { ctx.revert(); window.removeEventListener("keydown", handleKey); };
  }, []);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="py-24 px-6 bg-white"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="gallery-header text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: "#f0fffe", color: "#4ecdc4" }}
          >
            Nuestra galería
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Momentos que inspiran
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Cada día está lleno de aventuras, risas y aprendizajes únicos.
          </p>
        </div>

        <div className="gallery-masonry grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {photos.map((p) => (
            <div
              key={p.alt}
              className={`gal-item group relative overflow-hidden rounded-3xl cursor-pointer ${p.span ?? ""}`}
              style={{ border: `3px solid ${p.color}20` }}
              onClick={() => setLightbox({ src: p.src, alt: p.alt })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-white text-sm font-semibold">{p.alt}</span>
                <ZoomIn className="w-5 h-5 text-white" />
              </div>
              {/* Color top border accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-80"
                style={{ background: p.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
