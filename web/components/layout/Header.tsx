"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import Brand from "./Brand";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "Over ons" },
  { href: "/menu", label: "Ons menu" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

interface HeaderProps {
  phone?: string;
}

export default function Header({ phone = "31612345678" }: HeaderProps) {
  const pathname = usePathname();

  const whatsappLink = createWhatsAppLink(
    phone,
    "Hallo, ik wil graag meer informatie over catering van Lekker Anatolia."
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <Container className="flex min-h-20 items-center justify-between py-3">
        <Brand />

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <Button asChild className="rounded-full px-6">
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              Contact via WhatsApp
            </a>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full">
                <span aria-hidden="true" className="text-base leading-none">
                  ☰
                </span>
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] px-6 py-6">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="flex flex-col gap-5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-base transition-colors hover:text-foreground",
                          isActive
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}

                <SheetClose asChild>
                  <Button asChild className="mt-4 rounded-full">
                    <a href={whatsappLink} target="_blank" rel="noreferrer">
                      Contact via WhatsApp
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
