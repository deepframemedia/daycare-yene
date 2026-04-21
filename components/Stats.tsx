"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: "+", label: "Años de experiencia", color: "#ff6b47" },
  { value: 200, suffix: "+", label: "Familias felices", color: "#4ecdc4" },
  { value: 4, suffix: ":1", label: "Ratio educador-niño", color: "#ffd93d" },
  { value: 98, suffix: "%", label: "Satisfacción de padres", color: "#a855f7" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the whole bar sliding in
      gsap.from(sectionRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Animate each number counting up
      numbersRef.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            delay: i * 0.15,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
            onUpdate() {
              el.innerText = Math.round(Number(el.innerText)).toString();
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      <div
        className="mx-4 md:mx-auto max-w-5xl rounded-3xl px-8 py-10 shadow-xl"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <div className="text-4xl md:text-5xl font-black flex items-end gap-0.5" style={{ color: s.color, fontFamily: "var(--font-nunito)" }}>
                <span ref={(el) => { if (el) numbersRef.current[i] = el; }}>
                  {s.value}
                </span>
                <span className="text-3xl mb-1">{s.suffix}</span>
              </div>
              <p className="text-sm text-gray-300 font-medium leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
