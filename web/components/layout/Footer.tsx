import Link from "next/link";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { getSiteSettings } from "@/lib/settings";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "Over ons" },
  { href: "/menu", label: "Ons menu" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacyverklaring" },
  { href: "/terms-of-use", label: "Gebruiksvoorwaarden" },
  { href: "/cookies", label: "Cookiebeleid" },
];

export default async function Footer() {
  const settings = await getSiteSettings();
  const whatsappLink = createWhatsAppLink(
    settings.whatsapp_phone,
    "Hallo, ik wil graag meer informatie over catering van Lekker Anatolia."
  );

  return (
    <footer className="border-t border-border/70 bg-card/40 pt-12 pb-6">
      <Container>
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-serif text-xl font-semibold">Lekker Anatolia</p>
            <p className="mt-1 text-sm text-muted-foreground">Catering Service</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Ambachtelijke catering met een warme Anatolische touch — voor elk
              moment dat er toe doet.
            </p>

            {/* Social + WhatsApp */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
              {settings.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              Navigatie
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Legal */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground">
              Juridisch
            </p>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {settings.email && (
              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground mb-2">
                  Contact
                </p>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-8 opacity-50" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Lekker Anatolia. Alle rechten voorbehouden.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {settings.kvk_number && <span>KvK: {settings.kvk_number}</span>}
            {settings.btw_number && <span>BTW: {settings.btw_number}</span>}
          </div>
        </div>
      </Container>
    </footer>
  );
}
