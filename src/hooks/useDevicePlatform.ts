"use client";

import { useSyncExternalStore } from "react";

export type DevicePlatform = "android" | "ios" | "desktop" | "unknown";

function detectPlatform(): DevicePlatform {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  // iPadOS se présente comme un Mac : on le repère via l'écran tactile.
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return "desktop";
}

const subscribe = () => () => {};

/** Plateforme du visiteur ; "unknown" côté serveur pour éviter les écarts d'hydratation. */
export function useDevicePlatform(): DevicePlatform {
  return useSyncExternalStore(subscribe, detectPlatform, () => "unknown");
}
