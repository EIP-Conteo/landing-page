"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { IPHONE_WAITLIST_ANCHOR, playStoreUrl } from "@/lib/site";
import { useDevicePlatform } from "@/hooks/useDevicePlatform";
import { AppleIcon, GooglePlayIcon } from "@/components/shared/StoreIcons";

/**
 * CTA collé en bas d'écran sur mobile, une fois le hero dépassé.
 * Masqué quand la section finale (qui a déjà son CTA) est visible.
 */
export function MobileStickyCTA() {
  const platform = useDevicePlatform();
  const [pastHero, setPastHero] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = ["iphone", "telecharger", "pied-de-page"]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const visibleTargets = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleTargets.add(entry.target);
        else visibleTargets.delete(entry.target);
      }
      setEndVisible(visibleTargets.size > 0);
    });
    targets.forEach((node) => observer.observe(node));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const shown = pastHero && !endVisible;
  const isIos = platform === "ios";

  return (
    <div
      aria-hidden={!shown}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-300 lg:hidden",
        "bg-linear-to-t from-conteo-dark via-conteo-dark/90 to-transparent",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      {isIos ? (
        <a
          href={IPHONE_WAITLIST_ANCHOR}
          tabIndex={shown ? 0 : -1}
          onClick={() => trackEvent("cta_iphone_waitlist", { placement: "sticky", platform })}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-[1.25rem] bg-conteo-accent font-sans font-semibold text-conteo-dark shadow-lg"
        >
          <AppleIcon className="size-5" />
          Être prévenu pour iPhone
        </a>
      ) : (
        <a
          href={playStoreUrl("sticky")}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? 0 : -1}
          onClick={() => trackEvent("cta_play_store", { placement: "sticky", platform })}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-[1.25rem] bg-conteo-accent font-sans font-semibold text-conteo-dark shadow-lg"
        >
          <GooglePlayIcon className="size-5" />
          Télécharger gratuitement
        </a>
      )}
    </div>
  );
}
