"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "María González",
    role: "Mamá de Sofía, 3 años",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
    stars: 5,
    text: "Day Care cambió nuestra familia. Sofía llegó tímida y ahora es la niña más sociable y feliz. Los educadores son increíbles y siempre están disponibles para los padres.",
    color: "#ff6b47",
  },
  {
    name: "Carlos Ramírez",
    role: "Papá de Lucas, 2 años",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80",
    stars: 5,
    text: "La mejor decisión que tomamos fue inscribir a Lucas aquí. El ambiente es seguro, colorido y estimulante. Podemos ver cómo aprende algo nuevo cada semana.",
    color: "#4ecdc4",
  },
  {
    name: "Andrea López",
    role: "Mamá de Valentina, 4 años",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80",
    stars: 5,
    text: "Valentina ama sus clases de arte y música. El nivel educativo es excepcional y la relación con los educadores es muy cercana. ¡100% recomendado!",
    color: "#a855f7",
  },
  {
    name: "Roberto Méndez",
    role: "Papá de Mateo, 1 año",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80",
    stars: 5,
    text: "Dejé a Mateo por primera vez con mucho miedo, pero el equipo nos dio toda la confianza del mundo. Ahora Mateo llora cuando hay que irse, no cuando llega.",
    color: "#22c55e",
  },
  {
    name: "Luciana Pérez",
    role: "Mamá de Emilia, 2 años",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&q=80",
    stars: 5,
    text: "Las actividades al aire libre y los talleres de cocina son mis favoritos. Emilia come mejor desde que empezó. El personal es cariñoso y muy profesional.",
    color: "#f59e0b",
  },
  {
    name: "Diego Herrera",
    role: "Papá de Tomás, 3 años",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
    stars: 5,
    text: "Lo que más valoro es la comunicación constante. Cada tarde recibimos un resumen de lo que hizo Tomás. Esa transparencia nos da mucha tranquilidad.",
    color: "#ff4d8d",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const visibleCount = 3;
  const totalDots = Math.ceil(testimonials.length / visibleCount);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".test-header", {
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".test-track", {
        y: 60, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const animateTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    gsap.to(cardRef.current, {
      opacity: 0, y: 20, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setCurrent(index);
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", onComplete: () => setIsAnimating(false) }
        );
      },
    });
  };

  const prev = () => animateTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => animateTo((current + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #fff8f0 100%)" }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="test-header text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: "#faf5ff", color: "#a855f7" }}
          >
            Lo que dicen las familias
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Familias que confían en nosotros
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Más de 200 familias ya forman parte de nuestra comunidad.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="test-track">
          <div
            ref={cardRef}
            className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 border border-gray-100"
          >
            <Quote
              className="absolute top-8 right-8 w-16 h-16 opacity-5"
              style={{ color: t.color }}
            />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                  style={{ border: `3px solid ${t.color}` }}
                />
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffd93d] text-[#ffd93d]" />
                  ))}
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-black text-[#1a1a2e] text-lg" style={{ fontFamily: "var(--font-nunito)" }}>
                    {t.name}
                  </p>
                  <p className="text-sm font-medium" style={{ color: t.color }}>{t.role}</p>
                </div>
              </div>
            </div>
            {/* Color bar */}
            <div
              className="absolute bottom-0 left-8 right-8 h-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }}
            />
          </div>

          {/* Controls + mini grid */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Dot nav */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => animateTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 28 : 10,
                    height: 10,
                    background: i === current ? t.color : "#e5e7eb",
                  }}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ borderColor: t.color, color: t.color }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                style={{ background: `linear-gradient(135deg, ${t.color}, #ff4d8d)` }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mini avatar strip */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((tm, i) => (
              <button
                key={tm.name}
                onClick={() => animateTo(i)}
                className="transition-all duration-300"
                style={{
                  transform: i === current ? "scale(1.2)" : "scale(1)",
                  opacity: i === current ? 1 : 0.5,
                }}
                aria-label={tm.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tm.avatar}
                  alt={tm.name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: `2px solid ${i === current ? tm.color : "#e5e7eb"}` }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
