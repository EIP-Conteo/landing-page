import { track } from "@vercel/analytics";

type EventName =
  | "cta_play_store"
  | "cta_iphone_waitlist"
  | "demo_step"
  | "demo_complete"
  | "iphone_signup";

type EventProps = Record<string, string | number | boolean>;

/** Événements de conversion (Vercel Web Analytics : anonyme, sans cookies). */
export function trackEvent(name: EventName, props?: EventProps): void {
  try {
    track(name, props);
  } catch {
    // Le tracking ne doit jamais casser un parcours utilisateur.
  }
}
