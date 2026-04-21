import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Day Care Yene | Un lugar donde los sueños crecen",
  description:
    "Cuidado amoroso y educación temprana para niños de 0 a 5 años. Un espacio seguro y colorido donde cada día es una nueva aventura.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${nunito.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
