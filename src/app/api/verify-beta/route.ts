import { Resend } from "resend";
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

    const email: string = result.data.email.trim().toLowerCase();

    const { data: contact, error } = await resend.contacts.get({ email });

    if (error && error.statusCode !== 404) {
      console.error("Resend contact lookup error:", error);
      return NextResponse.json({ error: "Failed to verify" }, { status: 500 });
    }

    return NextResponse.json({ verified: !!contact });
  } catch (error) {
    console.error("Verify beta error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
