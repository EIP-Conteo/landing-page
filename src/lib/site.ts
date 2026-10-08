export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.theoewzzer.conteo";

/**
 * Lien Google Play avec un referrer UTM, pour attribuer les installations
 * à l'emplacement du CTA dans la Play Console.
 */
export function playStoreUrl(placement: string): string {
  const referrer = `utm_source=landing&utm_medium=website&utm_campaign=${placement}`;
  return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(referrer)}`;
}

export const IPHONE_WAITLIST_ANCHOR = "#iphone";

export const PRICING = {
  monthly: "5,99 €",
  yearly: "59,99 €",
  /** Montants pour les données structurées (schema.org). */
  monthlyAmount: "5.99",
  yearlyAmount: "59.99",
} as const;
