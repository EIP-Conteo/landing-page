"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function searchContactByEmail(email: string, token: string) {
  if (token !== process.env.ADMIN_TOKEN) {
    throw new Error("Unauthorized");
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    let hasMore = true;
    let after = undefined;

    // Fetch pages until we find the email
    while (hasMore) {
      const { data, error } = await resend.contacts.list({
        audienceId: audienceId || undefined,
        limit: 100,
        after,
      } as any); // cast as any to bypass SDK types if needed, though they support it

      if (error || !data) {
        return null;
      }

      const match = data.data.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (match) return match;

      hasMore = data.has_more;
      if (hasMore && data.data.length > 0) {
        after = data.data[data.data.length - 1].id;
      } else {
        hasMore = false;
      }
    }

    return null;
  } catch (e) {
    return null;
  }
}
