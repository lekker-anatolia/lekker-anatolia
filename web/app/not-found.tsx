import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container className="text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-5xl font-semibold sm:text-6xl">
          Pagina niet gevonden
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
          De pagina die je zoekt bestaat niet of is verplaatst. Ga terug naar de
          homepagina of neem contact met ons op.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/">Terug naar home</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link href="/contact">Contact opnemen</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
