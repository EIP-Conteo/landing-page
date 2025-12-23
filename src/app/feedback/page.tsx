"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import Link from "next/link";
import {
  Loader2,
  Send,
  Check,
  ArrowLeft,
  ArrowRight,
  Bug,
  Lightbulb,
  MessageSquare,
  ShieldQuestion,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Logo } from "@/components/shared/Logo";
import { Progress } from "@/components/ui/progress";

const emailSchema = z.object({
  email: z.email("Veuillez entrer une adresse email valide"),
});

const feedbackSchema = z.object({
  type: z.enum(["bug", "feature", "other"], {
    message: "Veuillez sélectionner un type",
  }),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères"),
});

type PageState =
  | "verify"
  | "not-verified"
  | "feedback"
  | "loading-verify"
  | "loading-feedback"
  | "success"
  | "error-verify"
  | "error-feedback";

const feedbackTypes = [
  {
    value: "bug",
    label: "Bug",
    icon: Bug,
    description: "Quelque chose ne fonctionne pas",
  },
  {
    value: "feature",
    label: "Suggestion",
    icon: Lightbulb,
    description: "Une idée d'amélioration",
  },
  {
    value: "other",
    label: "Autre",
    icon: MessageSquare,
    description: "Question ou commentaire",
  },
];

export default function FeedbackPage() {
  const [pageState, setPageState] = useState<PageState>("verify");
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Determine current step for progress
  const isStep2 =
    pageState === "feedback" ||
    pageState === "loading-feedback" ||
    pageState === "error-feedback";
  const progressValue = isStep2 ? 100 : 50;
  const stepText = isStep2 ? "2 sur 2" : "1 sur 2";

  // Email verification form
  const verifyForm = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: emailSchema,
    },
    onSubmit: async ({ value }) => {
      setPageState("loading-verify");
      setErrorMessage("");

      try {
        const response = await fetch("/api/verify-beta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value.email }),
        });

        const data = await response.json();

        if (!response.ok) {
          setPageState("error-verify");
          setErrorMessage(data.error || "Une erreur est survenue");
          return;
        }

        if (data.verified) {
          setVerifiedEmail(value.email);
          setPageState("feedback");
        } else {
          setPageState("not-verified");
        }
      } catch {
        setPageState("error-verify");
        setErrorMessage("Impossible de se connecter au serveur");
      }
    },
  });

  // Feedback form
  const feedbackForm = useForm({
    defaultValues: {
      type: "" as "bug" | "feature" | "other" | "",
      message: "",
    },
    validators: {
      onSubmit: feedbackSchema,
    },
    onSubmit: async ({ value }) => {
      setPageState("loading-feedback");
      setErrorMessage("");

      try {
        const response = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: verifiedEmail,
            type: value.type,
            message: value.message,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setPageState("error-feedback");
          setErrorMessage(data.error || "Une erreur est survenue");
          return;
        }

        setPageState("success");
      } catch {
        setPageState("error-feedback");
        setErrorMessage("Impossible de se connecter au serveur");
      }
    },
  });

  // Success state - separate layout
  if (pageState === "success") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-conteo-accent/20">
              <Check className="size-10 text-conteo-accent" strokeWidth={3} />
            </div>
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-conteo-dark mb-3">
            Merci pour votre retour !
          </h1>
          <p className="text-conteo-text-muted mb-8">
            Votre feedback nous aide à améliorer Contéo. Nous vous répondrons si
            nécessaire.
          </p>
          <Link href="/">
            <Button className="h-14 px-8 rounded-[20px] bg-conteo-accent text-conteo-dark font-semibold hover:bg-conteo-accent/90">
              <ArrowLeft className="size-5" />
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // Not verified state - separate layout
  if (pageState === "not-verified") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-conteo-secondary/20">
              <ShieldQuestion className="size-10 text-conteo-secondary" />
            </div>
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-conteo-dark mb-3">
            Email non reconnu
          </h1>
          <p className="text-conteo-text-muted mb-8">
            Cet email n&apos;est pas inscrit à la beta. Inscrivez-vous
            d&apos;abord pour pouvoir donner votre feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => setPageState("verify")}
              className="h-14 px-6 rounded-[20px] border-2 border-conteo-light text-conteo-dark hover:bg-conteo-light"
            >
              <ArrowLeft className="size-5" />
              Réessayer
            </Button>
            <Link href="/#beta">
              <Button className="h-14 px-6 rounded-[20px] bg-conteo-accent text-conteo-dark font-semibold hover:bg-conteo-accent/90">
                S&apos;inscrire à la beta
                <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="p-6">
        {isStep2 ? (
          <button
            onClick={() => {
              setVerifiedEmail("");
              setPageState("verify");
            }}
            className="inline-flex items-center justify-center size-10 rounded-full hover:bg-conteo-light transition-colors"
          >
            <ArrowLeft className="size-5 text-conteo-dark" />
          </button>
        ) : (
          <Link
            href="/"
            className="inline-flex items-center justify-center size-10 rounded-full hover:bg-conteo-light transition-colors"
          >
            <ArrowLeft className="size-5 text-conteo-dark" />
          </Link>
        )}
      </header>

      <div className="container mx-auto px-6 pt-4 pb-12">
        <div className="max-w-sm mx-auto">
          {isStep2 && (
            <div className="flex justify-center mb-6">
              <Logo size="md" showText={false} />
            </div>
          )}

          <h1 className="font-heading font-extrabold text-2xl text-conteo-dark text-center mb-2">
            {isStep2 ? "Donnez-nous votre avis" : "Quel est votre email ?"}
          </h1>

          {isStep2 ? (
            <p className="text-conteo-text-muted text-center text-sm mb-8">
              Connecté en tant que{" "}
              <span className="text-conteo-secondary font-medium">
                {verifiedEmail}
              </span>
            </p>
          ) : (
            <div className="mb-10" />
          )}

          {!isStep2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyForm.handleSubmit();
              }}
              className="space-y-8"
            >
              <verifyForm.Field name="email">
                {(field) => {
                  const isInvalid: boolean =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm text-conteo-dark mb-2 block"
                      >
                        Adresse email
                      </FieldLabel>
                      <div
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-[20px] border-2 transition-colors",
                          isInvalid
                            ? "border-red-300 bg-red-50/50"
                            : "border-conteo-light bg-white focus-within:border-conteo-secondary"
                        )}
                      >
                        <Mail className="size-6 text-conteo-secondary shrink-0" />
                        <input
                          id={field.name}
                          name={field.name}
                          type="email"
                          placeholder="votre@email.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          disabled={pageState === "loading-verify"}
                          className="flex-1 bg-transparent text-conteo-dark placeholder:text-conteo-text-muted outline-none text-base"
                        />
                      </div>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="mt-2"
                        />
                      )}
                    </Field>
                  );
                }}
              </verifyForm.Field>

              {pageState === "error-verify" && errorMessage && (
                <div className="bg-red-50 border-2 border-red-200 rounded-[20px] p-4">
                  <p className="text-sm text-red-600 text-center">
                    {errorMessage}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={pageState === "loading-verify"}
                className="w-full h-14 rounded-[20px] bg-conteo-accent text-conteo-dark font-semibold text-base hover:bg-conteo-accent/90 disabled:opacity-70"
              >
                {pageState === "loading-verify" ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  "Continuer"
                )}
              </Button>
            </form>
          )}

          {isStep2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                feedbackForm.handleSubmit();
              }}
              className="space-y-6"
            >
              <feedbackForm.Field name="type">
                {(field) => {
                  const isInvalid: boolean =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="text-sm text-conteo-dark mb-2 block">
                        Type de feedback
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(value: string): void =>
                          field.handleChange(
                            value as "bug" | "feature" | "other"
                          )
                        }
                      >
                        <SelectTrigger
                          id="feedback-type"
                          aria-invalid={isInvalid}
                          className={cn(
                            "w-full h-14 rounded-[20px] border-2 px-4",
                            isInvalid ? "border-red-300" : "border-conteo-light"
                          )}
                        >
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {feedbackTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <span className="flex items-center gap-2">
                                <type.icon className="size-4 text-conteo-secondary" />
                                {type.label}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="mt-2"
                        />
                      )}
                    </Field>
                  );
                }}
              </feedbackForm.Field>

              <feedbackForm.Field name="message">
                {(field) => {
                  const isInvalid: boolean =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-sm text-conteo-dark mb-2 block"
                      >
                        Message
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder="Décrivez votre retour en détail..."
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        className={cn(
                          "min-h-[150px] resize-none rounded-[20px] border-2 p-4",
                          isInvalid ? "border-red-300" : "border-conteo-light"
                        )}
                      />
                      <FieldDescription className="mt-2">
                        {field.state.value.length}/1000 caractères
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                          className="mt-2"
                        />
                      )}
                    </Field>
                  );
                }}
              </feedbackForm.Field>

              {pageState === "error-feedback" && errorMessage && (
                <div className="bg-red-50 border-2 border-red-200 rounded-[20px] p-4">
                  <p className="text-sm text-red-600 text-center">
                    {errorMessage}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={pageState === "loading-feedback"}
                className="w-full h-14 rounded-[20px] bg-conteo-accent text-conteo-dark font-semibold text-base hover:bg-conteo-accent/90 disabled:opacity-70"
              >
                {pageState === "loading-feedback" ? (
                  <Loader2 className="size-6 animate-spin" />
                ) : (
                  <>
                    <Send className="size-5" />
                    Envoyer mon feedback
                  </>
                )}
              </Button>
            </form>
          )}

          <div className="mt-8">
            <div className="flex items-center justify-end mb-2">
              <span className="text-conteo-secondary font-medium">
                {stepText}
              </span>
            </div>
            <Progress
              value={progressValue}
              className="h-2 bg-conteo-secondary/10 *:data-[slot=progress-indicator]:bg-conteo-secondary"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
