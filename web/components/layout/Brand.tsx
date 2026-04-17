import Link from "next/link";
import Image from "next/image";

export default function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.jpeg"
        alt="Lekker Anatolia"
        width={52}
        height={52}
        className="rounded-full object-cover"
        priority
      />

      <div className="leading-tight">
        <span className="block font-serif text-xl font-semibold tracking-tight">
          Lekker Anatolia
        </span>
        <span className="block text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Catering Service
        </span>
      </div>
    </Link>
  );
}
