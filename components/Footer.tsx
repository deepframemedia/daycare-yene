import { Heart } from "lucide-react";

const links = {
  Servicios: ["Educación Temprana", "Arte y Creatividad", "Juego al Aire Libre", "Nutrición Saludable"],
  Información: ["Sobre Nosotros", "Equipo Educativo", "Instalaciones", "Blog"],
  Legal: ["Privacidad", "Términos", "Cookies"],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg"
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
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Más de 15 años cuidando y educando a los niños más importantes del mundo: los tuyos.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                className="font-black text-sm uppercase tracking-wider mb-4"
                style={{ color: "#ff6b47" }}
              >
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Daycare. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            Hecho con <Heart className="w-4 h-4 fill-[#ff6b47] text-[#ff6b47]" /> para las familias
          </p>
        </div>
      </div>
    </footer>
  );
}
