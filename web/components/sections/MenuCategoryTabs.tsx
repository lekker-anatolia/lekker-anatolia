"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Category {
  slug: string;
  name: string;
}

interface MenuCategoryTabsProps {
  categories: Category[];
}

export default function MenuCategoryTabs({ categories }: MenuCategoryTabsProps) {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    categories.forEach(({ slug }) => {
      const el = document.getElementById(`category-${slug}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(slug);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  function scrollTo(slug: string) {
    const el = document.getElementById(`category-${slug}`);
    if (!el) return;
    const offset = 120; // header + tabs height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(slug);
  }

  // Scroll active tab into view within the tabs bar
  useEffect(() => {
    const bar = scrollRef.current;
    if (!bar) return;
    const btn = bar.querySelector<HTMLButtonElement>(`[data-slug="${active}"]`);
    if (!btn) return;
    btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <div className="sticky top-[79px] z-30 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto pl-5 pr-4 py-3 scrollbar-none sm:justify-center sm:px-6"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => (
          <button
            key={cat.slug}
            data-slug={cat.slug}
            onClick={() => scrollTo(cat.slug)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all first:ml-0.5 last:mr-0.5",
              active === cat.slug
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
