import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const signupSchema = z.object({
  email: z.email("Format d'email invalide"),
});

function getBetaWelcomeEmailHtml(): string {
  const contentSection = `
          <!-- Content iOS -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #2a2a42; text-align: center;">
                Inscription validée pour iPhone ! 🎉
              </h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #2a2a42;">
                Merci de rejoindre l'aventure Contéo ! Vous faites partie des premiers inscrits pour découvrir notre application d'histoires personnalisées.
              </p>
            </td>
          </tr>

          <!-- Coming Soon Box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #c9f560; border-radius: 16px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #2a2a42;">
                      ⏳ La version iOS arrive très bientôt !
                    </p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #2a2a42;">
                      La beta est ouverte à tous sur Android (<a href="https://play.google.com/store/apps/details?id=com.theoewzzer.conteo" target="_blank" style="color: #2a2a42; font-weight: 700;">Google Play</a>). Nous finalisons la version iOS pour TestFlight.<br><br>
                      <strong>Vous recevrez un email dès l'ouverture des accès sur TestFlight et l'App Store !</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Info Box -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #2a2a42; border-radius: 16px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #ffffff;">
                      <strong style="color: #c9f560;">💡 En tant que beta testeur :</strong><br>
                      • Vous aurez accès à toutes les fonctionnalités en avant-première<br>
                      • Vos retours nous aideront à améliorer l'app<br>
                      • Vous bénéficierez d'avantages exclusifs au lancement
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue dans la beta Contéo !</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #2a2a42;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #2a2a42;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #efeefc; border-radius: 32px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Nunito', sans-serif; font-size: 32px; font-weight: 800; color: #2a2a42;">
                Contéo
              </h1>
              <p style="margin: 8px 0 0; font-size: 14px; color: #6a5ae0;">
                Des histoires magiques pour vos enfants ✨
              </p>
            </td>
          </tr>

          ${contentSection}

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #e0dfef;">
              <p style="margin: 0 0 8px; font-size: 14px; color: #858494;">
                Un bug, une suggestion ou une remarque ?<br>
                Rendez-vous sur <a href="https://www.conteo.xyz/feedback" style="color: #6a5ae0; text-decoration: underline;">https://www.conteo.xyz/feedback</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #858494;">
                © ${new Date().getFullYear()} Contéo. Tous droits réservés.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = signupSchema.safeParse(body);
    if (!result.success) {
      const errorMessage: string =
        result.error.issues[0]?.message || "Email invalide";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const email: string = result.data.email.trim().toLowerCase();

    const { data: existingContact } = await resend.contacts.get({ email });

    if (existingContact) {
      return NextResponse.json(
        { error: "Cet email est déjà inscrit" },
        { status: 409 },
      );
    }

    const { data: contact, error: contactError } = await resend.contacts.create(
      {
        email,
        unsubscribed: false,
      },
    );

    if (contactError) {
      console.error("Resend contact error:", contactError);
      return NextResponse.json(
        { error: "Failed to add contact" },
        { status: 500 },
      );
    }

    // Send welcome email (iOS waiting list)
    const emailSubject = "🎉 Bienvenue sur la liste d'attente Contéo (iOS)";

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Contéo <noreply@conteo.xyz>",
      to: email,
      subject: emailSubject,
      html: getBetaWelcomeEmailHtml(),
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      // Don't fail the signup if email fails, contact was already created
    }

    // Notification Discord
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl) {
      try {
        await fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "🍏 Nouvelle inscription Liste d'attente iOS",
                description: `Un nouvel utilisateur a rejoint la **liste d'attente iOS**. Il sera prévenu lors du lancement TestFlight.\n\n[👉 Ouvrir le Dashboard Admin](${process.env.NEXT_PUBLIC_APP_URL || "https://www.conteo.xyz"}/admin?token=${process.env.ADMIN_TOKEN}&email=${encodeURIComponent(email)})`,
                color: 7001824, // Violet Contéo (6a5ae0)
                fields: [
                  {
                    name: "E-mail",
                    value: `\`${email}\``,
                    inline: true,
                  },
                ],
              },
            ],
          }),
        });
      } catch (discordError) {
        console.error("Erreur Webhook Discord:", discordError);
        // On ne bloque pas l'inscription si le webhook échoue
      }
    }

    return NextResponse.json({ success: true, contactId: contact?.id });
  } catch (error) {
    console.error("Beta signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
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
        { status: 500 },
      );
    }

    return NextResponse.json({ count: data?.data?.length ?? 0 });
  } catch (error) {
    console.error("Beta count error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
