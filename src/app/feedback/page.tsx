"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bug,
  Check,
  Lightbulb,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  ShieldQuestion,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
  },
  {
    value: "feature",
    label: "Suggestion",
    icon: Lightbulb,
  },
  {
    value: "other",
    label: "Autre",
    icon: MessageSquare,
  },
] as const;

interface FeedbackStepProps {
  pageState: PageState;
  setPageState: (state: PageState) => void;
  setErrorMessage: (message: string) => void;
}

export default function FeedbackPage() {
  const [pageState, setPageState] = useState<PageState>("verify");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isStep2 =
    pageState === "feedback" ||
    pageState === "loading-feedback" ||
    pageState === "error-feedback";

  if (pageState === "success") {
    return <SuccessState />;
  }

  if (pageState === "not-verified") {
    return <NotVerifiedState onRetry={() => setPageState("verify")} />;
  }

  return (
    <main className="min-h-screen bg-white">
      <FeedbackHeader
        isStep2={isStep2}
        onBackToVerify={() => {
          setVerifiedEmail("");
          setPageState("verify");
        }}
      />

      <div className="container mx-auto px-6 pt-4 pb-12">
        <div className="mx-auto max-w-sm">
          {isStep2 && (
            <div className="mb-6 flex justify-center">
              <Logo size="md" showText={false} />
            </div>
          )}

          <h1 className="mb-2 text-center font-heading text-2xl font-semibold text-conteo-dark">
            {isStep2 ? "Donnez-nous votre avis" : "Quel est votre email ?"}
          </h1>

          {isStep2 ? (
            <FeedbackIntro verifiedEmail={verifiedEmail} />
          ) : (
            <div className="mb-10" />
          )}

          {!isStep2 && (
            <VerifyEmailForm
              pageState={pageState}
              setPageState={setPageState}
              setVerifiedEmail={setVerifiedEmail}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}

          {isStep2 && (
            <FeedbackForm
              pageState={pageState}
              setPageState={setPageState}
              verifiedEmail={verifiedEmail}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}

          <StepProgress isStep2={isStep2} />
        </div>
      </div>
    </main>
  );
}

function SuccessState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-conteo-accent/20">
            <Check className="size-10 text-conteo-accent" strokeWidth={3} />
          </div>
        </div>
        <h1 className="mb-3 font-heading text-2xl font-semibold text-conteo-dark">
          Merci pour votre retour !
        </h1>
        <p className="mb-8 text-conteo-text-muted">
          Votre feedback nous aide à améliorer Contéo. Nous vous répondrons si
          nécessaire.
        </p>
        <Link href="/">
          <Button className="h-14 rounded-[20px] bg-conteo-accent px-8 font-semibold text-conteo-dark hover:bg-conteo-accent/90">
            <ArrowLeft className="size-5" />
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>
    </main>
  );
}

function NotVerifiedState({ onRetry }: Readonly<{ onRetry: () => void }>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-conteo-secondary/20">
            <ShieldQuestion className="size-10 text-conteo-secondary" />
          </div>
        </div>
        <h1 className="mb-3 font-heading text-2xl font-semibold text-conteo-dark">
          Email non reconnu
        </h1>
        <p className="mb-8 text-conteo-text-muted">
          Cet email n&apos;est pas inscrit à la beta. Inscrivez-vous
          d&apos;abord pour pouvoir donner votre feedback.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={onRetry}
            className="h-14 rounded-[20px] border-2 border-conteo-light px-6 text-conteo-dark hover:bg-conteo-light"
          >
            <ArrowLeft className="size-5" />
            Réessayer
          </Button>
          <Link href="/#beta">
            <Button className="h-14 rounded-[20px] bg-conteo-accent px-6 font-semibold text-conteo-dark hover:bg-conteo-accent/90">
              S&apos;inscrire à la beta
              <ArrowRight className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function FeedbackHeader({
  isStep2,
  onBackToVerify,
}: Readonly<{
  isStep2: boolean;
  onBackToVerify: () => void;
}>) {
  return (
    <header className="p-6">
      {isStep2 ? (
        <button
          type="button"
          onClick={onBackToVerify}
          className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-conteo-light"
        >
          <ArrowLeft className="size-5 text-conteo-dark" />
        </button>
      ) : (
        <Link
          href="/"
          className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-conteo-light"
        >
          <ArrowLeft className="size-5 text-conteo-dark" />
        </Link>
      )}
    </header>
  );
}

function FeedbackIntro({ verifiedEmail }: Readonly<{ verifiedEmail: string }>) {
  return (
    <p className="mb-8 text-center text-sm text-conteo-text-muted">
      Connecté en tant que{" "}
      <span className="font-medium text-conteo-secondary">{verifiedEmail}</span>
    </p>
  );
}

function VerifyEmailForm({
  pageState,
  setPageState,
  setVerifiedEmail,
  errorMessage,
  setErrorMessage,
}: Readonly<
  FeedbackStepProps & {
    setVerifiedEmail: (email: string) => void;
    errorMessage: string;
  }
>) {
  const verifyForm = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: emailSchema },
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

  return (
    <form action={() => void verifyForm.handleSubmit()} className="space-y-8">
      <verifyForm.Field name="email">
        {(field) => (
          <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
            <FieldLabel
              htmlFor={field.name}
              className="mb-2 block text-sm text-conteo-dark"
            >
              Adresse email
            </FieldLabel>
            <EmailInput
              field={field}
              disabled={pageState === "loading-verify"}
            />
            {field.state.meta.isTouched && !field.state.meta.isValid && (
              <FieldError errors={field.state.meta.errors} className="mt-2" />
            )}
          </Field>
        )}
      </verifyForm.Field>
      <FormError
        visible={pageState === "error-verify" && !!errorMessage}
        message={errorMessage}
      />
      <SubmitButton loading={pageState === "loading-verify"}>
        Continuer
      </SubmitButton>
    </form>
  );
}

function EmailInput({
  field,
  disabled,
}: Readonly<{
  field: {
    name: string;
    state: { value: string; meta: { isTouched: boolean; isValid: boolean } };
    handleBlur: () => void;
    handleChange: (value: string) => void;
  };
  disabled: boolean;
}>) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-[20px] border-2 p-4 transition-colors",
        isInvalid
          ? "border-red-300 bg-red-50/50"
          : "border-conteo-light bg-white focus-within:border-conteo-secondary"
      )}
    >
      <Mail className="size-6 shrink-0 text-conteo-secondary" />
      <input
        id={field.name}
        name={field.name}
        type="email"
        placeholder="votre@email.com"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        aria-invalid={isInvalid}
        disabled={disabled}
        className="flex-1 bg-transparent text-base text-conteo-dark outline-none placeholder:text-conteo-text-muted"
      />
    </div>
  );
}

function FeedbackForm({
  pageState,
  setPageState,
  verifiedEmail,
  errorMessage,
  setErrorMessage,
}: Readonly<
  FeedbackStepProps & {
    verifiedEmail: string;
    errorMessage: string;
  }
>) {
  const feedbackForm = useForm({
    defaultValues: {
      type: "" as "bug" | "feature" | "other" | "",
      message: "",
    },
    validators: { onSubmit: feedbackSchema },
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

  return (
    <form action={() => void feedbackForm.handleSubmit()} className="space-y-6">
      <feedbackForm.Field name="type">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel className="mb-2 block text-sm text-conteo-dark">
                Type de feedback
              </FieldLabel>
              <Select
                name={field.name}
                value={field.state.value}
                onValueChange={(value: string) =>
                  field.handleChange(value as "bug" | "feature" | "other")
                }
              >
                <SelectTrigger
                  id="feedback-type"
                  aria-invalid={isInvalid}
                  className={cn(
                    "h-14 w-full rounded-[20px] border-2 px-4",
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
                <FieldError errors={field.state.meta.errors} className="mt-2" />
              )}
            </Field>
          );
        }}
      </feedbackForm.Field>
      <feedbackForm.Field name="message">
        {(field) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <FieldLabel
                htmlFor={field.name}
                className="mb-2 block text-sm text-conteo-dark"
              >
                Message
              </FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                placeholder="Décrivez votre retour en détail..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
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
                <FieldError errors={field.state.meta.errors} className="mt-2" />
              )}
            </Field>
          );
        }}
      </feedbackForm.Field>
      <FormError
        visible={pageState === "error-feedback" && !!errorMessage}
        message={errorMessage}
      />
      <SubmitButton
        loading={pageState === "loading-feedback"}
        icon={<Send className="size-5" />}
      >
        Envoyer mon feedback
      </SubmitButton>
    </form>
  );
}

function FormError({
  visible,
  message,
}: Readonly<{
  visible: boolean;
  message: string;
}>) {
  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-[20px] border-2 border-red-200 bg-red-50 p-4">
      <p className="text-center text-sm text-red-600">{message}</p>
    </div>
  );
}

function SubmitButton({
  loading,
  icon,
  children,
}: Readonly<{
  loading: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <Button
      type="submit"
      disabled={loading}
      className="h-14 w-full rounded-[20px] bg-conteo-accent text-base font-semibold text-conteo-dark hover:bg-conteo-accent/90 disabled:opacity-70"
    >
      {loading ? (
        <Loader2 className="size-6 animate-spin" />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </Button>
  );
}

function StepProgress({ isStep2 }: Readonly<{ isStep2: boolean }>) {
  return (
    <div className="mt-8">
      <div className="mb-2 flex items-center justify-end">
        <span className="font-medium text-conteo-secondary">
          {isStep2 ? "2 sur 2" : "1 sur 2"}
        </span>
      </div>
      <Progress
        value={isStep2 ? 100 : 50}
        className="h-2 bg-conteo-secondary/10 *:data-[slot=progress-indicator]:bg-conteo-secondary"
      />
    </div>
  );
}
