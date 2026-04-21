"use client";

import { motion, type Transition, type TargetAndTransition } from "framer-motion";
import { Heart, Sparkles, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingShapeProps {
  className?: string;
  delay?: number;
  duration?: number;
  size?: number;
  color?: string;
  shape?: "circle" | "square";
}

function FloatingShape({ className, delay = 0, duration = 8, size = 60, color = "bg-coral-300/20", shape = "circle" }: FloatingShapeProps) {
  return (
    <motion.div
      animate={{ opacity: [0.35, 0.7, 0.35], y: [0, -30, 0], x: [0, 15, 0], scale: [0.85, 1.05, 0.85], rotate: [0, 180, 360] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className={cn("absolute blur-xl", color, className)}
      style={{ width: size, height: size, borderRadius: shape === "circle" ? "9999px" : "16px" }}
    />
  );
}

function fadeIn(delay: number): { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition } {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: "easeOut" },
  };
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fff8f0 0%, #fff0f5 50%, #f0fffe 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingShape delay={0}   duration={10} size={130} color="bg-yellow-300/25" className="left-[4%]   top-[8%]"    />
        <FloatingShape delay={0.5} duration={12} size={90}  color="bg-pink-300/30"   className="right-[6%]  top-[12%]"   />
        <FloatingShape delay={1}   duration={9}  size={110} color="bg-teal-300/25"   className="left-[8%]   bottom-[22%]" shape="square" />
        <FloatingShape delay={1.5} duration={11} size={95}  color="bg-red-300/25"    className="right-[12%] bottom-[20%]" />
        <FloatingShape delay={2}   duration={13} size={75}  color="bg-blue-300/25"   className="left-[22%]  top-[28%]"   shape="square" />
        <FloatingShape delay={2.5} duration={10} size={115} color="bg-green-300/20"  className="right-[28%] top-[38%]"   />
        <FloatingShape delay={3}   duration={14} size={65}  color="bg-orange-300/30" className="left-[35%]  bottom-[12%]" />
        <FloatingShape delay={3.5} duration={12} size={88}  color="bg-purple-300/20" className="right-[8%]  bottom-[38%]" shape="square" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Badge */}
        {mounted && (
          <motion.div {...fadeIn(0.3)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/60 mb-8 shadow-sm">
            <Heart className="h-4 w-4 fill-[#ff6b47] text-[#ff6b47]" />
            <span className="text-sm text-[#ff6b47] font-semibold tracking-wide">
              Guardería de confianza desde 2009
            </span>
          </motion.div>
        )}

        {/* Headline */}
        {mounted && (
          <motion.h1
            {...fadeIn(0.45)}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            <span style={{ background: "linear-gradient(135deg, #ff6b47, #ff4d8d, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Un lugar donde
            </span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #4ecdc4, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              los sueños crecen
            </span>
          </motion.h1>
        )}

        {/* Subtitle */}
        {mounted && (
          <motion.p
            {...fadeIn(0.6)}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Cuidado amoroso y educación temprana para niños de{" "}
            <strong className="text-[#ff6b47]">0 a 5 años</strong>. Un espacio
            seguro donde cada día es una nueva aventura de aprendizaje y diversión.
          </motion.p>
        )}

        {/* CTAs */}
        {mounted && (
          <motion.div {...fadeIn(0.75)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#contacto"
              className="group relative px-9 py-4 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #ff6b47, #ff4d8d)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Agenda una visita <Sparkles className="h-5 w-5" />
              </span>
            </a>
            <a
              href="#servicios"
              className="px-9 py-4 font-bold text-lg rounded-full border-2 transition-all duration-300 hover:scale-105 hover:bg-teal-50"
              style={{ borderColor: "#4ecdc4", color: "#4ecdc4" }}
            >
              Conocer más
            </a>
          </motion.div>
        )}

        {/* Trust pills */}
        {mounted && (
          <motion.div {...fadeIn(0.9)} className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            {[
              { dot: "#22c55e", text: "Certificado por el MEC" },
              { dot: "#3b82f6", text: "Personal altamente calificado" },
              { dot: "#a855f7", text: "Ambiente 100% seguro" },
            ].map(({ dot, text }) => (
              <div key={text} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: dot }} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400"
      >
        <ChevronDown className="w-7 h-7" />
      </motion.div>
    </section>
  );
}
