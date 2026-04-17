"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const STORAGE_KEY = "lekker_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookiemelding"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 bg-background/95 px-4 py-5 shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm sm:rounded-2xl sm:border"
    >
      <button
        onClick={decline}
        aria-label="Sluiten"
        className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <p className="pr-6 text-sm font-medium text-foreground">
        Wij gebruiken cookies 🍪
      </p>
      <p className="mt-1.5 pr-6 text-xs leading-5 text-muted-foreground">
        We gebruiken functionele cookies om de site goed te laten werken. Lees
        meer in ons{" "}
        <Link
          href="/cookies"
          className="underline underline-offset-3 hover:text-foreground"
        >
          cookiebeleid
        </Link>
        .
      </p>

      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          className="rounded-full"
          onClick={accept}
        >
          Accepteer
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          onClick={decline}
        >
          Alleen functioneel
        </Button>
      </div>
    </div>
  );
}
