import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
  email: z.email("Format d'email invalide"),
});

const BETA_DOWNLOAD_URL: string = process.env.BETA_DOWNLOAD_URL ?? "";

function getBetaWelcomeEmailHtml(): string {
  const isBetaAvailable = BETA_DOWNLOAD_URL.length > 0;

  const contentSection = isBetaAvailable
    ? `
          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #2a2a42; text-align: center;">
                Bienvenue dans la beta ! 🎉
              </h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #2a2a42;">
                Merci de rejoindre l'aventure Contéo ! Vous faites partie des premiers à découvrir notre application de création d'histoires personnalisées pour enfants.
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #2a2a42;">
                Téléchargez l'application sur votre téléphone Android et commencez à créer des histoires uniques avec vos enfants :
              </p>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td style="padding: 0 40px 30px; text-align: center;">
              <a href="${BETA_DOWNLOAD_URL}" target="_blank" style="display: inline-block; padding: 18px 32px; background-color: #c9f560; color: #2a2a42; text-decoration: none; border-radius: 16px; font-weight: 700; font-size: 18px;">
                📲 Télécharger l'app
              </a>
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
                      • Vous avez accès à toutes les fonctionnalités en avant-première<br>
                      • Vos retours nous aident à améliorer l'app<br>
                      • Vous bénéficierez d'avantages exclusifs au lancement
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Android Notice -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #858494; text-align: center;">
                <strong>Note :</strong> La beta est actuellement disponible sur Android uniquement.<br>
                La version iOS arrive bientôt !
              </p>
            </td>
          </tr>`
    : `
          <!-- Content - Beta not yet available -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #2a2a42; text-align: center;">
                Vous êtes sur la liste ! 🎉
              </h2>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #2a2a42;">
                Merci de rejoindre l'aventure Contéo ! Vous faites partie des premiers à vouloir découvrir notre application de création d'histoires personnalisées pour enfants.
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
                      🚀 La beta arrive très bientôt !
                    </p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #2a2a42;">
                      Nous mettons les dernières touches à l'application.<br>
                      Vous recevrez un email avec le lien de téléchargement dès que la beta sera disponible.
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
                Une question ? Répondez simplement à cet email.
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

    const result = emailSchema.safeParse(body);
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

    // Send welcome email with beta access links
    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Contéo <noreply@conteo.app>",
      to: email,
      subject: "🎉 Bienvenue dans la beta Contéo !",
      html: getBetaWelcomeEmailHtml(),
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      // Don't fail the signup if email fails, contact was already created
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
