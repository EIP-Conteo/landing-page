"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { BetaSignupForm } from "@/components/shared/BetaSignupForm";
import { AppleIcon } from "@/components/shared/StoreIcons";

function fetchSubscriberCount(): Promise<number | null> {
  return fetch("/api/beta-signup")
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => (typeof data?.count === "number" ? data.count : null))
    .catch(() => null);
}

/** Seuil sous lequel le compteur dessert plus qu'il ne rassure. */
const MIN_COUNT_TO_DISPLAY = 20;

export function IphoneWaitlistSection() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSubscriberCount().then((value) => {
      if (!cancelled) setCount(value);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSuccess = () => {
    trackEvent("iphone_signup");
    fetchSubscriberCount().then(setCount);
  };

  return (
    <section id="iphone" aria-labelledby="iphone-title" className="relative bg-white px-4 py-16 md:py-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-conteo-dark px-6 py-14 text-center md:px-16">
        <div aria-hidden="true" className="absolute -left-24 -top-24 size-72 rounded-full bg-conteo-secondary/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-24 -right-24 size-72 rounded-full bg-conteo-accent/15 blur-3xl" />
        <div className="relative">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
            <AppleIcon className="size-7" />
          </span>
          <h2 id="iphone-title" className="mt-6 text-balance font-heading text-3xl font-extrabold text-white md:text-4xl">
            Sur iPhone ? Contéo arrive bientôt.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-lg text-white/65">
            Laissez votre email : vous serez prévenu dès que Contéo pourra s&apos;installer sur iPhone.
          </p>
          <BetaSignupForm onSuccess={handleSuccess} className="mx-auto mt-8" />
          {count !== null && count >= MIN_COUNT_TO_DISPLAY && (
            <p className="mt-6 font-sans text-sm text-white/50">
              <span className="font-semibold text-conteo-accent">{count}</span> familles attendent déjà la version iPhone
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
