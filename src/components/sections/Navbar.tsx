"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoImg from "../../../public/logo.png";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { IPHONE_WAITLIST_ANCHOR, playStoreUrl } from "@/lib/site";
import { useDevicePlatform } from "@/hooks/useDevicePlatform";

const links = [
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#coucher", label: "Le coucher" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const platform = useDevicePlatform();
  const isIos = platform === "ios";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-conteo-dark/85 py-3 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "bg-transparent py-5",
      )}
    >
      <nav
        aria-label="Navigation principale"
        className="container mx-auto flex items-center justify-between gap-6 px-6"
      >
        <a href="#accueil" className="flex items-center gap-2.5" aria-label="Contéo, retour en haut">
          <Image src={logoImg} alt="" width={36} height={36} className="rounded-[22.5%]" priority />
          <span className="font-heading text-2xl font-extrabold tracking-tight text-conteo-accent">
            Contéo
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {isIos ? (
          <a
            href={IPHONE_WAITLIST_ANCHOR}
            onClick={() => trackEvent("cta_iphone_waitlist", { placement: "navbar", platform })}
            className="rounded-full bg-conteo-accent px-5 py-2.5 font-sans text-sm font-semibold text-conteo-dark transition-transform hover:-translate-y-0.5"
          >
            Liste iPhone
          </a>
        ) : (
          <a
            href={playStoreUrl("navbar")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_play_store", { placement: "navbar", platform })}
            className="rounded-full bg-conteo-accent px-5 py-2.5 font-sans text-sm font-semibold text-conteo-dark transition-transform hover:-translate-y-0.5"
          >
            Télécharger
          </a>
        )}
      </nav>
    </header>
  );
}
