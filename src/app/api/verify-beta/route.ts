import { Contact, Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
  email: z.email("Format d'email invalide"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = emailSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const { email } = result.data;

    const { data, error } = await resend.contacts.list();

    if (error) {
      console.error("Resend list error:", error);
      return NextResponse.json({ error: "Failed to verify" }, { status: 500 });
    }

    const emailLower: string = email.toLowerCase();
    const exists: boolean = data?.data?.some(
      (contact: Contact): boolean => contact.email.toLowerCase() === emailLower
    );

    return NextResponse.json({ verified: exists });
  } catch (error) {
    console.error("Verify beta error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
