"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Palette, Wind, Apple, Music, Users, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: BookOpen,
    title: "Educación Temprana",
    desc: "Programas pedagógicos diseñados para estimular el desarrollo cognitivo y emocional de cada niño.",
    color: "#ff6b47",
    bg: "linear-gradient(135deg, #ff6b47, #ff8c6b)",
    photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
  {
    icon: Palette,
    title: "Arte y Creatividad",
    desc: "Talleres de pintura, manualidades y expresión artística que despiertan la imaginación.",
    color: "#a855f7",
    bg: "linear-gradient(135deg, #a855f7, #c084fc)",
    photo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80",
  },
  {
    icon: Wind,
    title: "Juego al Aire Libre",
    desc: "Amplias áreas verdes y equipamiento seguro para el juego libre y la actividad física.",
    color: "#4ecdc4",
    bg: "linear-gradient(135deg, #4ecdc4, #06b6d4)",
    photo: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80",
  },
  {
    icon: Apple,
    title: "Nutrición Saludable",
    desc: "Menús balanceados y saludables preparados por nutricionistas especializados en infancia.",
    color: "#22c55e",
    bg: "linear-gradient(135deg, #22c55e, #4ade80)",
    photo: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&q=80",
  },
  {
    icon: Music,
    title: "Música y Ritmo",
    desc: "Clases de música, percusión y canto que potencian la memoria y la coordinación.",
    color: "#f59e0b",
    bg: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    photo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80",
  },
  {
    icon: Users,
    title: "Desarrollo Social",
    desc: "Actividades grupales que fomentan la empatía, la comunicación y el trabajo en equipo.",
    color: "#ff4d8d",
    bg: "linear-gradient(135deg, #ff4d8d, #f472b6)",
    photo: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-header", {
        y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".services-carousel", {
        y: 60, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    gsap.to(slideRef.current, {
      opacity: 0, x: -30, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setCurrent(index);
        gsap.fromTo(slideRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out", onComplete: () => setIsAnimating(false) }
        );
      },
    });
  };

  const prev = () => goTo((current - 1 + services.length) % services.length);
  const next = () => goTo((current + 1) % services.length);

  const s = services[current];

  return (
    <section id="servicios" ref={sectionRef} className="py-24 px-6 bg-white overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="services-header text-center mb-14">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: "#fff3f0", color: "#ff6b47" }}
          >
            ¿Qué ofrecemos?
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Todo lo que tu hijo necesita
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Un entorno enriquecedor con actividades diseñadas para el desarrollo integral de cada pequeño.
          </p>
        </div>

        {/* Carousel */}
        <div className="services-carousel">
          <div ref={slideRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[420px]">
            {/* Photo side */}
            <div className="relative h-72 lg:h-full min-h-[340px] rounded-3xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.photo}
                alt={s.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 opacity-40"
                style={{ background: s.bg }}
              />
              {/* Badge on photo */}
              <div
                className="absolute top-5 left-5 px-4 py-2 rounded-2xl text-white text-sm font-bold backdrop-blur-sm"
                style={{ background: "rgba(0,0,0,0.35)" }}
              >
                {current + 1} / {services.length}
              </div>
              {/* Icon on photo */}
              <div
                className="absolute bottom-5 right-5 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ background: s.bg }}
              >
                <s.icon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Text side */}
            <div className="flex flex-col justify-center gap-6 px-2 lg:px-6">
              <div>
                <div
                  className="inline-block w-12 h-1.5 rounded-full mb-4"
                  style={{ background: s.color }}
                />
                <h3
                  className="text-3xl md:text-4xl font-black text-[#1a1a2e] mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {s.title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed">{s.desc}</p>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2.5">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === current ? 28 : 10,
                      height: 10,
                      background: i === current ? s.color : "#e5e7eb",
                    }}
                    aria-label={`Ir a ${services[i].title}`}
                  />
                ))}
              </div>

              {/* Nav buttons */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ borderColor: s.color, color: s.color }}
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                  style={{ background: s.bg }}
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
