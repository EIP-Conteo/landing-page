import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const feedbackEmail: string = process.env.FEEDBACK_EMAIL!;

const feedbackSchema = z.object({
  email: z.email("Format d'email invalide"),
  type: z.enum(["bug", "feature", "other"], {
    message: "Type de feedback invalide",
  }),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = feedbackSchema.safeParse(body);
    if (!result.success) {
      const errorMessage: string =
        result.error.issues[0]?.message || "Données invalides";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { email, type, message } = result.data;

    const typeLabels: Record<string, string> = {
      bug: "🐛 Bug",
      feature: "💡 Suggestion",
      other: "📝 Autre",
    };

    const { error: emailError } = await resend.emails.send({
      from: "Contéo Feedback <onboarding@resend.dev>",
      to: feedbackEmail,
      replyTo: email,
      subject: `[Contéo] ${typeLabels[type]} - Nouveau feedback`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; background: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h1 style="color: #2a2a42; font-size: 24px; margin: 0 0 24px;">${typeLabels[type]}</h1>

              <div style="background: #f8f8fc; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #666; font-size: 14px;">De:</p>
                <p style="margin: 4px 0 0; color: #2a2a42; font-size: 16px;">
                  <a href="mailto:${email}" style="color: #6a5ae0;">${email}</a>
                </p>
              </div>

              <div style="background: #f8f8fc; border-radius: 8px; padding: 16px;">
                <p style="margin: 0; color: #666; font-size: 14px;">Message:</p>
                <p style="margin: 8px 0 0; color: #2a2a42; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>

              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">

              <p style="margin: 0; color: #999; font-size: 12px; text-align: center;">
                Feedback envoyé depuis la landing page Contéo
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      console.log("=== FEEDBACK RECEIVED (email failed) ===");
      console.log("From:", email);
      console.log("Type:", type);
      console.log("Message:", message);
      console.log("=========================================");

      return NextResponse.json({
        success: true,
        warning: "Feedback reçu mais email non envoyé",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
