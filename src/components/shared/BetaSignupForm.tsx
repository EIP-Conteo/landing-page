"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import Link from "next/link";
import {
  Loader2,
  Sparkles,
  Check,
  MessageSquare,
  UserCheck,
  Info,
  ExternalLink,
  Users,
  CheckCircle2,
  Download,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const signupSchema = z.object({
  email: z.email("Veuillez entrer une adresse email valide"),
  os: z.enum(["iOS", "Android"], {
    message: "Veuillez préciser votre appareil",
  }),
});

type FormState =
  | "idle"
  | "loading"
  | "success"
  | "already-registered"
  | "error";

type OS = "iOS" | "Android";

interface BetaSignupFormProps {
  onSuccess?: () => void;
  className?: string;
  defaultOs?: OS;
}

export function BetaSignupForm({
  onSuccess,
  className,
  defaultOs = "Android",
}: Readonly<BetaSignupFormProps>) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedOs, setSubmittedOs] = useState<OS>(defaultOs);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const form = useForm({
    defaultValues: {
      email: "",
      os: defaultOs,
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      setFormState("loading");
      setErrorMessage("");
      setSubmittedOs(value.os);
      setSubmittedEmail(value.email);

      try {
        const response = await fetch("/api/beta-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value.email, os: value.os }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 409) {
            setFormState("already-registered");
            return;
          }
          setFormState("error");
          setErrorMessage(data.error || "Une erreur est survenue");
          return;
        }

        setFormState("success");
        onSuccess?.();
      } catch {
        setFormState("error");
        setErrorMessage("Impossible de se connecter au serveur");
      }
    },
  });

  const handleReset = () => {
    setFormState("idle");
    setErrorMessage("");
  };

  if (formState === "success" && submittedOs === "Android") {
    return (
      <AndroidSuccessSteps
        email={submittedEmail}
        onReset={handleReset}
        className={className}
      />
    );
  }

  if (formState === "already-registered" && submittedOs === "Android") {
    return (
      <AndroidSuccessSteps
        email={submittedEmail}
        isAlreadyRegistered
        onReset={handleReset}
        className={className}
      />
    );
  }

  if (formState === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center max-w-md mx-auto",
          className,
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-conteo-accent/20">
          <Check className="size-7 text-conteo-accent" />
        </div>
        <div>
          <p className="text-xl font-semibold text-white">
            Vous êtes sur la liste pour iPhone ! 🎉
          </p>
          <p className="text-sm text-conteo-text-muted mt-2 leading-relaxed">
            {submittedEmail ? (
              <>
                Un email de confirmation a été envoyé à{" "}
                <strong className="text-white">{submittedEmail}</strong>.
              </>
            ) : null}{" "}
            Nous vous préviendrons par email dès que Contéo sera disponible sur
            iOS (TestFlight / App Store).
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 text-sm text-conteo-accent hover:text-conteo-accent/80 transition-colors"
          >
            <MessageSquare className="size-4" />
            Donnez-nous votre avis
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            <RotateCcw className="size-3.5" />
            Inscrire un autre email
          </button>
        </div>
      </div>
    );
  }

  if (formState === "already-registered") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center max-w-md mx-auto",
          className,
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-conteo-secondary/20">
          <UserCheck className="size-7 text-conteo-secondary" />
        </div>
        <div>
          <p className="text-xl font-semibold text-white">
            Vous êtes déjà inscrit !
          </p>
          <p className="text-sm text-conteo-text-muted mt-2 leading-relaxed">
            Merci de votre fidélité. Nous préparons la version iOS et vous
            préviendrons dès le lancement.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-2 text-sm text-conteo-accent hover:text-conteo-accent/80 transition-colors"
          >
            <MessageSquare className="size-4" />
            Donnez-nous votre avis
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
          >
            <RotateCcw className="size-3.5" />
            Tester avec un autre email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className={cn("w-full max-w-xl", className)}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <form.Field name="os">
          {(field) => {
            const isInvalid: boolean =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="sm:w-32 shrink-0" data-invalid={isInvalid}>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value as any)}
                  disabled={formState === "loading"}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={isInvalid}
                    className="h-12! w-full rounded-xl border-white/20 bg-white/10 text-white focus:ring-conteo-accent/30 focus-visible:border-conteo-accent focus-visible:ring-1 focus-visible:ring-offset-0 data-[state=open]:bg-white/10 text-sm"
                  >
                    <SelectValue placeholder="OS" />
                  </SelectTrigger>
                  <SelectContent className="border-white/20 bg-conteo-dark text-white">
                    <SelectItem
                      value="Android"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Android
                    </SelectItem>
                    <SelectItem
                      value="iOS"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      iOS (iPhone)
                    </SelectItem>
                  </SelectContent>
                </Select>
                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="text-red-400"
                  />
                )}
              </Field>
            );
          }}
        </form.Field>
        <form.Field name="email">
          {(field) => {
            const isInvalid: boolean =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field className="flex-1" data-invalid={isInvalid}>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="votre@email.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  disabled={formState === "loading"}
                  className="h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-conteo-accent focus-visible:ring-conteo-accent/30"
                />
                {isInvalid && (
                  <FieldError
                    errors={field.state.meta.errors}
                    className="text-red-400"
                  />
                )}
              </Field>
            );
          }}
        </form.Field>
        <Button
          type="submit"
          disabled={formState === "loading"}
          className="h-12 rounded-xl bg-conteo-accent px-6 font-semibold text-conteo-dark hover:bg-conteo-accent/90 disabled:opacity-70 cursor-pointer"
        >
          {formState === "loading" ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="size-4" />
              Rejoindre
            </>
          )}
        </Button>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs text-white/80 text-center">
        <Info className="size-4 shrink-0 text-conteo-accent" />
        <span>
          {
            "Utilisez l'adresse email reliée à votre compte Play Store ou Apple."
          }
        </span>
      </div>

      {formState === "error" && errorMessage && (
        <p className="mt-3 text-center text-sm text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}

function AndroidSuccessSteps({
  email,
  isAlreadyRegistered = false,
  onReset,
  className,
}: Readonly<{
  email?: string;
  isAlreadyRegistered?: boolean;
  onReset: () => void;
  className?: string;
}>) {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto text-left rounded-3xl bg-white/5 border border-white/15 p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6",
        className,
      )}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex size-14 items-center justify-center rounded-full bg-conteo-accent/20">
          <Check className="size-7 text-conteo-accent" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">
          {isAlreadyRegistered
            ? "Vous êtes déjà inscrit ! 🚀"
            : "Votre accès Android est prêt ! 🚀"}
        </h3>
        <p className="text-sm text-white/75 max-w-md">
          {email ? (
            <>
              Un email récapitulatif a été envoyé à{" "}
              <span className="font-semibold text-white">{email}</span>.
            </>
          ) : null}{" "}
          Suivez ces <strong>3 étapes dans l&apos;ordre</strong> depuis votre
          smartphone Android :
        </p>
      </div>

      <div className="space-y-3.5">
        {/* Étape 1 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-conteo-accent/40 transition-colors">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-conteo-accent text-conteo-dark font-bold text-sm">
              1
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Rejoindre le groupe des testeurs
              </p>
              <p className="text-xs text-white/60">
                Rejoignez le groupe avec le compte Google relié à votre Play
                Store.
              </p>
            </div>
          </div>
          <a
            href="https://groups.google.com/g/conteo-testers"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-conteo-accent px-4 py-2.5 text-xs font-semibold text-conteo-dark hover:bg-conteo-accent/90 shrink-0 transition-colors"
          >
            <Users className="size-3.5" />
            1. Rejoindre le groupe
            <ExternalLink className="size-3" />
          </a>
        </div>

        {/* Étape 2 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-conteo-accent/40 transition-colors">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-conteo-accent text-conteo-dark font-bold text-sm">
              2
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Activer votre accès testeur
              </p>
              <p className="text-xs text-white/60">
                Sur la page Google Play, cliquez sur le bouton « Devenir testeur
                ».
              </p>
            </div>
          </div>
          <a
            href="https://play.google.com/apps/testing/com.theoewzzer.conteo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 shrink-0 transition-colors border border-white/15"
          >
            <CheckCircle2 className="size-3.5 text-conteo-accent" />
            2. Devenir testeur
            <ExternalLink className="size-3" />
          </a>
        </div>

        {/* Étape 3 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-conteo-accent/40 transition-colors">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-conteo-accent text-conteo-dark font-bold text-sm">
              3
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Télécharger Contéo
              </p>
              <p className="text-xs text-white/60">
                L&apos;application est maintenant débloquée sur votre Google
                Play Store !
              </p>
            </div>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.theoewzzer.conteo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-conteo-secondary px-4 py-2.5 text-xs font-semibold text-white hover:bg-conteo-secondary/90 shrink-0 transition-colors"
          >
            <Download className="size-3.5" />
            3. Google Play Store
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Warning callout */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200/90 flex items-start gap-2.5">
        <AlertTriangle className="size-4 shrink-0 text-amber-400 mt-0.5" />
        <span className="leading-relaxed">
          <strong>Important :</strong> Si le Play Store vous indique{" "}
          <em>« Application introuvable »</em>, assurez-vous d&apos;avoir bien
          validé l&apos;Étape 1 et l&apos;Étape 2 avec la{" "}
          <strong>même adresse Google</strong> que celle connectée à votre
          téléphone.
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-white/60 border-t border-white/10">
        <Link
          href="/feedback"
          className="inline-flex items-center gap-1.5 text-conteo-accent hover:text-conteo-accent/80 transition-colors"
        >
          <MessageSquare className="size-3.5" />
          Donnez-nous votre avis
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
        >
          <RotateCcw className="size-3.5" />
          Recommencer / Autre adresse
        </button>
      </div>
    </div>
  );
}
