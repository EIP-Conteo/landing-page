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
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";

const signupSchema = z.object({
  email: z.email("Veuillez entrer une adresse email valide"),
});

type FormState =
  | "idle"
  | "loading"
  | "success"
  | "already-registered"
  | "error";

interface BetaSignupFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function BetaSignupForm({
  onSuccess,
  className,
}: Readonly<BetaSignupFormProps>) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      setFormState("loading");
      setErrorMessage("");
      setSubmittedEmail(value.email);

      try {
        const response = await fetch("/api/beta-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value.email }),
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
            "Utilisez l'adresse email reliée à votre compte Apple."
          }
        </span>
      </div>

      {formState === "error" && errorMessage && (
        <p className="mt-3 text-center text-sm text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}
