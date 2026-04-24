import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";

const PATHS = [
  "/",
  "/menu",
  "/faq",
  "/about-us",
  "/contact",
  "/cookies",
  "/privacy-policy",
  "/terms-of-use",
] as const;

/**
 * On-demand revalidation. Call from Strapi webhooks (POST) with a shared secret.
 * Vercel: set REVALIDATE_SECRET. Strapi: Webhooks → URL
 *   https://YOUR_SITE/api/revalidate?secret=REVALIDATE_SECRET
 * Or: POST with header `x-revalidate-secret: <same value>`.
 * Without this, the site still uses time-based `revalidate: 3` on fetches (not instant).
 */
export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return Response.json(
      { message: "REVALIDATE_SECRET is not configured on the server" },
      { status: 503 }
    );
  }

  const q = request.nextUrl.searchParams.get("secret");
  const h = request.headers.get("x-revalidate-secret");
  if (q !== expected && h !== expected) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  for (const p of PATHS) {
    revalidatePath(p);
  }

  return Response.json({ ok: true, paths: [...PATHS], at: Date.now() });
}
