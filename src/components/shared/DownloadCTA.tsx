"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { IPHONE_WAITLIST_ANCHOR, playStoreUrl } from "@/lib/site";
import { useDevicePlatform } from "@/hooks/useDevicePlatform";
import { AppleIcon, GooglePlayIcon } from "@/components/shared/StoreIcons";

interface DownloadCTAProps {
  /** Emplacement du CTA, utilisé pour l'attribution (UTM + analytics). */
  placement: string;
  tone?: "dark" | "light";
  align?: "start" | "center";
  /** Affiche un QR code Google Play sur desktop. */
  showQr?: boolean;
  /** "sm" : bouton compact, sans lien secondaire. */
  size?: "md" | "sm";
  className?: string;
}

const primaryButton =
  "group inline-flex h-14 items-center justify-center gap-3 rounded-[1.25rem] bg-conteo-accent px-7 font-sans text-base font-semibold text-conteo-dark shadow-[0_12px_32px_-12px_rgba(201,245,96,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(201,245,96,0.85)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-conteo-accent/40 active:translate-y-0";

export function DownloadCTA({
  placement,
  tone = "dark",
  align = "start",
  showQr = false,
  size = "md",
  className,
}: Readonly<DownloadCTAProps>) {
  const platform = useDevicePlatform();
  const isIos = platform === "ios";
  const secondaryLink =
    tone === "dark"
      ? "text-white/70 hover:text-conteo-accent"
      : "text-conteo-dark/70 hover:text-conteo-secondary";

  const buttonClass = cn(primaryButton, size === "sm" && "h-11 px-4 text-sm");

  const onPlayClick = () => trackEvent("cta_play_store", { placement, platform });
  const onIphoneClick = () =>
    trackEvent("cta_iphone_waitlist", { placement, platform });

  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-center",
        align === "center" && "items-center lg:justify-center",
        align === "start" && "items-center lg:items-center lg:justify-start",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-3",
          align === "center" ? "items-center" : "items-center lg:items-start",
        )}
      >
        {isIos ? (
          <a href={IPHONE_WAITLIST_ANCHOR} onClick={onIphoneClick} className={buttonClass}>
            <AppleIcon className="size-5" />
            Être prévenu pour iPhone
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        ) : (
          <a
            href={playStoreUrl(placement)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPlayClick}
            className={buttonClass}
          >
            <GooglePlayIcon className="size-5" />
            Télécharger gratuitement
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        )}

        {size === "md" && (
          <p className={cn("font-sans text-sm", tone === "dark" ? "text-white/50" : "text-conteo-text-muted")}>
            {isIos ? (
              <>
                Déjà disponible sur{" "}
                <a
                  href={playStoreUrl(placement)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onPlayClick}
                  className={cn("font-medium underline-offset-4 hover:underline transition-colors", secondaryLink)}
                >
                  Android
                </a>
              </>
            ) : (
              <>
                Disponible sur Android ·{" "}
                <a
                  href={IPHONE_WAITLIST_ANCHOR}
                  onClick={onIphoneClick}
                  className={cn("font-medium underline-offset-4 hover:underline transition-colors", secondaryLink)}
                >
                  Sur iPhone ? Être prévenu
                </a>
              </>
            )}
          </p>
        )}
      </div>

      {showQr && (platform === "desktop" || platform === "unknown") && (
        <div
          className={cn(
            "hidden items-center gap-3 rounded-[1.25rem] p-2.5 pr-4 lg:flex",
            tone === "dark" ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-white ring-1 ring-conteo-dark/10",
          )}
        >
          <div className="rounded-xl bg-white p-1.5">
            <Image
              src="/images/qr-google-play.svg"
              alt="QR code pour télécharger Contéo sur Google Play"
              width={64}
              height={64}
              unoptimized
            />
          </div>
          <p className={cn("max-w-[8.5rem] text-xs leading-snug", tone === "dark" ? "text-white/60" : "text-conteo-text-muted")}>
            Scannez avec votre téléphone Android
          </p>
        </div>
      )}
    </div>
  );
}
