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
      const errorMessage: string =
        result.error.issues[0]?.message || "Email invalide";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { email } = result.data;

    const { data: existingContact } = await resend.contacts.get({ email });

    if (existingContact) {
      return NextResponse.json(
        { error: "Cet email est déjà inscrit" },
        { status: 409 }
      );
    }

    const { data: contact, error: contactError } = await resend.contacts.create(
      {
        email,
        unsubscribed: false,
      }
    );

    if (contactError) {
      console.error("Resend contact error:", contactError);
      return NextResponse.json(
        { error: "Failed to add contact" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, contactId: contact?.id });
  } catch (error) {
    console.error("Beta signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await resend.contacts.list();

    if (error) {
      console.error("Resend list error:", error);
      return NextResponse.json(
        { error: "Failed to get count" },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: data?.data?.length ?? 0 });
  } catch (error) {
    console.error("Beta count error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
