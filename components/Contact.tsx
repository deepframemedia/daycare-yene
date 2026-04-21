"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-left", {
        x: -60, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".contact-right", {
        x: 60, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const info = [
    { icon: MapPin, text: "Av. Principal 123, Ciudad", color: "#ff6b47" },
    { icon: Phone, text: "+1 (555) 123-4567", color: "#4ecdc4" },
    { icon: Mail, text: "hola@daycareyene.com", color: "#a855f7" },
    { icon: Clock, text: "Lun–Vie: 7:00 am – 6:00 pm", color: "#ffd93d" },
  ];

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: "linear-gradient(135deg, #fff8f0 0%, #f0fffe 100%)" }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: "#fff3f0", color: "#ff6b47" }}
          >
            ¡Hablemos!
          </span>
          <h2
            className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-4"
            style={{ fontFamily: "var(--font-nunito)" }}
          >
            Agenda una visita hoy
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Queremos conocer a tu familia. Escríbenos y coordinamos la visita perfecta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — info */}
          <div className="contact-left space-y-6">
            <div
              className="p-8 rounded-3xl text-white"
              style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
            >
              <h3
                className="text-2xl font-black mb-6"
                style={{ fontFamily: "var(--font-nunito)" }}
              >
                Información de contacto
              </h3>
              <div className="space-y-5">
                {info.map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: color + "22", border: `1.5px solid ${color}` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-gray-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-3xl h-52 flex items-center justify-center text-gray-400 text-sm font-medium border-2 border-dashed border-gray-200 overflow-hidden relative"
              style={{ background: "#f8fafc" }}
            >
              <div className="text-center">
                <MapPin className="w-10 h-10 mx-auto mb-2 text-[#4ecdc4]" />
                <span>Mapa interactivo</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-right">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {sent ? (
                <div className="text-center py-12">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl"
                    style={{ background: "linear-gradient(135deg, #ff6b47, #ff4d8d)" }}
                  >
                    🎉
                  </div>
                  <h3
                    className="text-2xl font-black text-[#1a1a2e] mb-2"
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-500">Nos pondremos en contacto en menos de 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: "name", label: "Nombre completo", type: "text", placeholder: "María González" },
                    { id: "email", label: "Correo electrónico", type: "email", placeholder: "maria@email.com" },
                    { id: "phone", label: "Teléfono", type: "tel", placeholder: "+1 (555) 000-0000" },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        required
                        value={form[id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none transition-all duration-200 focus:border-[#ff6b47] focus:ring-2 focus:ring-[#ff6b47]/20"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mensaje</label>
                    <textarea
                      placeholder="Cuéntanos sobre tu hijo y cuándo te gustaría visitarnos..."
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none transition-all duration-200 focus:border-[#ff6b47] focus:ring-2 focus:ring-[#ff6b47]/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg, #ff6b47, #ff4d8d)" }}
                  >
                    Enviar mensaje <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
