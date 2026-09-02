import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { token, email, os, contactId, audienceId } = await request.json();

    if (token !== process.env.ADMIN_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!email || !os || !contactId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const templateName = os.toLowerCase() === "ios" ? "ios-access.html" : "android-access.html";
    const templatePath = path.join(process.cwd(), "email-templates", templateName);
    
    let htmlContent = "";
    try {
      htmlContent = fs.readFileSync(templatePath, "utf-8");
    } catch (e) {
      console.error("Template not found", e);
      return NextResponse.json({ error: "Template not found" }, { status: 500 });
    }

    const { error: emailError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Contéo <noreply@conteo.xyz>",
      to: email,
      subject: `🚀 Votre accès à la beta de Contéo est prêt ! (${os})`,
      html: htmlContent,
    });

    if (emailError) {
      console.error("Resend send error:", emailError);
      return NextResponse.json({ error: emailError.message || "Failed to send email" }, { status: 500 });
    }

    const sentStatus = `Envoyé le ${new Date().toLocaleDateString("fr-FR")}`;

    // Met à jour le contact dans Resend pour marquer comme envoyé (via last_name)
    // Et met à jour l'OS (first_name) au cas où il avait été renseigné manuellement via le prompt
    const { error: updateError } = await resend.contacts.update({
      id: contactId,
      audienceId: audienceId || process.env.RESEND_AUDIENCE_ID || "", 
      firstName: os,
      lastName: sentStatus,
    });

    if (updateError) {
      console.error("Resend update error:", updateError);
      // On ne retourne pas d'erreur car le mail est bien parti
    }

    return NextResponse.json({ success: true, status: sentStatus });
  } catch (error) {
    console.error("Admin send access error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
