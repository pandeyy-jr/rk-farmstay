import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RK Farmstay handles your enquiry details.",
};

export default function PrivacyPage() {
  return (
    <>
      <main id="main" className="bg-cream pb-20 pt-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-clay">
            RK Farmstay
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Privacy Policy
          </h1>
          <div className="prose-sm mt-8 space-y-5 text-[15px] leading-relaxed text-ink/75">
            <p>
              RK Farmstay, Karjat (“we”) collects only the details you choose to share when
              you enquire about a stay — typically your name, phone number, travel dates,
              guest count and any message you write.
            </p>
            <h2 className="pt-2 font-display text-2xl font-semibold text-ink">
              How enquiries work
            </h2>
            <p>
              The enquiry form on this website does not store your details on any server. When
              you press “Send Enquiry on WhatsApp”, your details are compiled into a message
              and opened in WhatsApp, addressed to our booking number ({SITE.phones.primary}).
              The message is only sent if you confirm it inside WhatsApp.
            </p>
            <h2 className="pt-2 font-display text-2xl font-semibold text-ink">
              How we use your details
            </h2>
            <p>
              We use your details solely to respond to your enquiry — confirming availability,
              pricing and stay arrangements. We do not sell your information, and we do not
              add you to marketing lists without your permission.
            </p>
            <h2 className="pt-2 font-display text-2xl font-semibold text-ink">
              Third parties
            </h2>
            <p>
              If you contact us via WhatsApp, phone, Google Maps or Instagram, the respective
              platform&apos;s own privacy policy also applies. The embedded map on our location
              section is provided by Google.
            </p>
            <h2 className="pt-2 font-display text-2xl font-semibold text-ink">
              Contact
            </h2>
            <p>
              For any question about your details, call us on {SITE.phones.primary} or{" "}
              {SITE.phones.secondary}, or message us on{" "}
              <a
                className="font-bold text-forest underline"
                href={SITE.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              .
            </p>
          </div>
          <Link
            href="/"
            className="mt-10 inline-block rounded-full bg-forest px-6 py-3 text-sm font-bold text-cream"
          >
            ← Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
