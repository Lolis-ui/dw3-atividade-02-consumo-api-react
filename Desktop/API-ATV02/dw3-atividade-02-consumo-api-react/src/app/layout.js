import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arceus - Catálogo Pokémon",
  description:
    "Catálogo de Pokémon por região, com detalhes, evolução e lendários.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <header>
          {/* Link envolvendo a logo e o título para voltar à home */}
          <Link href="/" className="header-brand">
            <Image
              src="/imgs/logo2.svg"
              alt="Logo Mundo Pokémon"
              width={45}
              height={45}
              priority
              unoptimized
            />
            <h1>Arceus - Catálogo Pokémon</h1>
          </Link>
        </header>

        <main>{children}</main>

        <footer>
          <p>
            Dados fornecidos pela{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              PokéAPI
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
