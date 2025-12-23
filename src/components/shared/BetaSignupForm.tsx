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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError } from "@/components/ui/field";

const emailSchema = z.object({
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

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: emailSchema,
    },
    onSubmit: async ({ value }) => {
      setFormState("loading");
      setErrorMessage("");

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

  if (formState === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          className
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-conteo-accent/20">
          <Check className="size-6 text-conteo-accent" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">
            Vous êtes sur la liste !
          </p>
          <p className="text-sm text-conteo-text-muted mt-1">
            Nous vous préviendrons dès que Contéo sera disponible.
          </p>
        </div>
        <Link
          href="/feedback"
          className="inline-flex items-center gap-2 text-sm text-conteo-accent hover:text-conteo-accent/80 transition-colors"
        >
          <MessageSquare className="size-4" />
          Donnez-nous votre avis
        </Link>
      </div>
    );
  }

  if (formState === "already-registered") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          className
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-conteo-secondary/20">
          <UserCheck className="size-6 text-conteo-secondary" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">
            Vous êtes déjà inscrit !
          </p>
          <p className="text-sm text-conteo-text-muted mt-1">
            Merci de votre enthousiasme. On vous préviendra bientôt !
          </p>
        </div>
        <Link
          href="/feedback"
          className="inline-flex items-center gap-2 text-sm text-conteo-accent hover:text-conteo-accent/80 transition-colors"
        >
          <MessageSquare className="size-4" />
          Donnez-nous votre avis
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn("w-full max-w-md", className)}
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
          className="h-12 rounded-xl bg-conteo-accent px-6 font-semibold text-conteo-dark hover:bg-conteo-accent/90 disabled:opacity-70"
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

      {formState === "error" && errorMessage && (
        <p className="mt-3 text-center text-sm text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}
