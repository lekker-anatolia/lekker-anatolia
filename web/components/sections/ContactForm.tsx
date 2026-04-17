"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      className="rounded-full px-8"
      disabled={pending}
    >
      {pending ? "Versturen…" : "Verstuur bericht"}
    </Button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-accent/10 px-8 py-10 text-center">
        <p className="text-2xl font-serif font-semibold">Bedankt!</p>
        <p className="mt-3 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Naam <span className="text-accent">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Jan de Vries"
            required
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            E-mailadres <span className="text-accent">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jan@voorbeeld.nl"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefoonnummer</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+31 6 12 34 56 78"
            autoComplete="tel"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Onderwerp</Label>
          <select
            id="subject"
            name="subject"
            defaultValue="algemene_vraag"
            className={cn(
              "flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm text-foreground shadow-none transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <option value="catering_aanvraag">Catering aanvraag</option>
            <option value="algemene_vraag">Algemene vraag</option>
            <option value="samenwerking">Samenwerking</option>
            <option value="klacht">Klacht</option>
            <option value="overig">Overig</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Bericht <span className="text-accent">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Vertel ons meer over je aanvraag of vraag…"
          required
          rows={5}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Velden met <span className="text-accent">*</span> zijn verplicht. We
        verwerken je gegevens conform onze{" "}
        <a href="/privacy-policy" className="underline hover:text-foreground">
          privacyverklaring
        </a>
        .
      </p>

      <SubmitButton />
    </form>
  );
}
