import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { strapiFetch, type StrapiList } from "@/lib/strapi";

type TestimonialData = {
  id: number;
  name: string;
  role?: string;
  text: string;
  rating: number;
};

const staticTestimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Sarah & Tom",
    role: "Bruiloft",
    text: "Lekker Anatolia heeft onze bruiloft compleet gemaakt. De lahmacun en mezze waren verrukkelijk — onze gasten waren enthousiast. Persoonlijk contact en alles tot in de puntjes geregeld.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marta V.",
    role: "Bedrijfsevenement",
    text: "Voor ons bedrijfsfeest hadden we catering nodig voor 80 personen. Lekker Anatolia leverde precies wat ze beloofden: smaakvol, op tijd en professioneel. Zeker voor herhaling vatbaar!",
    rating: 5,
  },
  {
    id: 3,
    name: "Yusuf K.",
    role: "Familiebijeenkomst",
    text: "Authentieke smaken, warme bediening en een fijne communicatie. We voelden ons echt geholpen bij het samenstellen van het menu. Aanrader voor elke gelegenheid.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-accent" : "text-border"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

async function getTestimonials(): Promise<TestimonialData[]> {
  const res = await strapiFetch<StrapiList<TestimonialData>>({
    path: "/testimonials?sort=sort_order:asc&pagination[limit]=6&filters[publishedAt][$notNull]=true",
    next: { revalidate: 300 },
  });
  if (!res?.data?.length) return staticTestimonials;
  return res.data;
}

export default async function TestimonialsSection() {
  const items = await getTestimonials();

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Ervaringen
          </p>
          <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">
            Wat onze klanten zeggen
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.id}
              className="rounded-[1.75rem] border-border/70 bg-card/80 shadow-none"
            >
              <CardContent className="flex h-full flex-col p-8">
                <StarRating rating={item.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                  &ldquo;{item.text}&rdquo;
                </blockquote>
                <div className="mt-6 border-t border-border/50 pt-4">
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  {item.role && (
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
