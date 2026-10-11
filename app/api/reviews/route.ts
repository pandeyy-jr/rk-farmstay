import { NextResponse } from "next/server";

/**
 * GET /api/reviews — live Google rating + reviews via the Places API (New).
 *
 * Requires env vars:
 *   GOOGLE_PLACES_API_KEY — server-only key with Places API enabled
 *   GOOGLE_PLACE_ID       — e.g. "ChIJ..." for the RK Farmstay listing
 *
 * Without them (or on any upstream failure) it returns { live: false } and
 * the site falls back to the owner-supplied snapshot in lib/site.ts.
 * Nothing sensitive is ever logged or sent to the client.
 */

interface LiveReview {
  name: string;
  text: string;
  rating: number;
  when: string;
}

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return NextResponse.json({ live: false as const });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(
      `https://places.googleapis.com/v1/${placeId}?fields=rating,userRatingCount,reviews,googleMapsUri`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
        },
        signal: controller.signal,
        next: { revalidate: 3600 },
      }
    );
    clearTimeout(timeout);

    if (!res.ok) return NextResponse.json({ live: false as const });

    const data = await res.json();
    const reviews: LiveReview[] = Array.isArray(data.reviews)
      ? data.reviews.slice(0, 3).map((r: Record<string, unknown>) => ({
          name:
            typeof r.authorAttribution === "object" && r.authorAttribution !== null
              ? String(
                  (r.authorAttribution as Record<string, unknown>).displayName ?? "Google user"
                )
              : "Google user",
          text: typeof r.text === "object" && r.text !== null
            ? String((r.text as Record<string, unknown>).text ?? "")
            : "",
          rating: typeof r.rating === "number" ? r.rating : 5,
          when: typeof r.relativePublishTimeDescription === "string"
            ? r.relativePublishTimeDescription
            : "",
        }))
      : [];

    return NextResponse.json({
      live: true as const,
      rating: typeof data.rating === "number" ? data.rating : null,
      reviewCount: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
      reviewsUrl: typeof data.googleMapsUri === "string" ? data.googleMapsUri : null,
      reviews,
    });
  } catch {
    return NextResponse.json({ live: false as const });
  }
}
