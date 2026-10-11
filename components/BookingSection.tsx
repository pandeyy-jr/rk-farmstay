"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BadgeCheck, CalendarDays, MessageCircle, Phone, Users } from "lucide-react";
import { useState, type FormEvent } from "react";
import { buildEnquiryMessage, SITE, telHref, waHref, type EnquiryDetails } from "@/lib/site";
import { EASE, Eyebrow, Reveal } from "@/lib/motion";

const EMPTY: EnquiryDetails = {
  checkIn: "",
  checkOut: "",
  guests: "2",
  name: "",
  phone: "",
  message: "",
};

type Errors = Partial<Record<keyof EnquiryDetails, string>>;

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function BookingSection() {
  const [form, setForm] = useState<EnquiryDetails>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof EnquiryDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function validate(): Errors {
    const er: Errors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      er.name = "Please tell us your name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/[\s+\-]/g, "").replace(/^91/, "")))
      er.phone = "Enter a valid 10-digit mobile number.";
    if (!form.checkIn) er.checkIn = "Choose a check-in date.";
    else if (form.checkIn < todayISO()) er.checkIn = "Check-in can't be in the past.";
    if (!form.checkOut) er.checkOut = "Choose a check-out date.";
    else if (form.checkIn && form.checkOut <= form.checkIn)
      er.checkOut = "Check-out must be after check-in.";
    const g = Number(form.guests);
    if (!Number.isFinite(g) || g < 1 || g > 200) er.guests = "Enter 1–200 guests.";
    return er;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length > 0) {
      document
        .querySelector<HTMLElement>("#contact [aria-invalid='true']")
        ?.focus({ preventScroll: false });
      return;
    }
    window.open(waHref(buildEnquiryMessage(form)), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const inputCls = (bad?: string) =>
    `w-full rounded-2xl border bg-white/95 px-4 py-3.5 text-[15px] font-medium text-ink placeholder:text-ink/35 transition-colors focus:border-clay focus:outline-none ${
      bad ? "border-red-500" : "border-forest/15"
    }`;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 bg-pine py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Pitch */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <Eyebrow tone="gold">Get in touch</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="contact-heading"
              className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] text-cream"
            >
              Plan your stay
              <br />
              at <span className="italic text-gold">RK Farmstay</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-cream/75">
              Have a question or want to book your stay? Send an enquiry on WhatsApp or call
              us — we&apos;ll confirm availability and pricing personally.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              <a
                href={waHref("Hello RK Farmstay! I would like to enquire about a stay.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-[#1faa55] px-4 py-5 text-center text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#178a44]"
              >
                <MessageCircle size={22} aria-hidden />
                <span className="text-[12px] font-semibold uppercase tracking-wider text-white/85">
                  WhatsApp
                </span>
                <span className="text-[15px] font-extrabold tracking-wide">
                  {SITE.phones.primary}
                </span>
              </a>
              <a
                href={telHref(SITE.phones.secondary)}
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-cream/10 px-4 py-5 text-center text-cream ring-1 ring-cream/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream/15"
              >
                <Phone size={22} aria-hidden />
                <span className="text-[12px] font-semibold uppercase tracking-wider text-cream/70">
                  Call now
                </span>
                <span className="text-[15px] font-extrabold tracking-wide">
                  {SITE.phones.secondary}
                </span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-6 font-display text-2xl italic text-cream/55">
              Your perfect getaway awaits
            </p>
          </Reveal>
        </div>

        {/* Form card */}
        <Reveal delay={0.12} y={40}>
          <div className="rounded-[26px] bg-cream p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] md:p-9">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-cream">
                    <BadgeCheck size={30} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-semibold text-ink">
                    Enquiry sent!
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink/70">
                    WhatsApp should have opened with your enquiry details. If it
                    didn&apos;t, call us directly — availability and pricing will be
                    confirmed by the property.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={telHref(SITE.phones.primary)}
                      className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-bold text-cream"
                    >
                      <Phone size={15} /> Call {SITE.phones.primary}
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm(EMPTY);
                      }}
                      className="rounded-full border border-forest/25 px-6 py-3 text-sm font-bold text-forest transition-colors hover:border-forest"
                    >
                      New enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  onSubmit={onSubmit}
                  noValidate
                  aria-label="Booking enquiry form"
                >
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    Check availability
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-ink/60">
                    Fill this in — it opens WhatsApp with everything pre-typed.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="in-date" className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-bold text-forest">
                        <CalendarDays size={13} aria-hidden /> Check-in
                      </label>
                      <input
                        id="in-date"
                        type="date"
                        value={form.checkIn}
                        onChange={set("checkIn")}
                        aria-invalid={!!errors.checkIn}
                        aria-describedby={errors.checkIn ? "err-in" : undefined}
                        className={inputCls(errors.checkIn)}
                      />
                      {errors.checkIn && (
                        <p id="err-in" role="alert" className="mt-1 text-xs font-semibold text-red-600">
                          {errors.checkIn}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="out-date" className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-bold text-forest">
                        <CalendarDays size={13} aria-hidden /> Check-out
                      </label>
                      <input
                        id="out-date"
                        type="date"
                        value={form.checkOut}
                        onChange={set("checkOut")}
                        aria-invalid={!!errors.checkOut}
                        aria-describedby={errors.checkOut ? "err-out" : undefined}
                        className={inputCls(errors.checkOut)}
                      />
                      {errors.checkOut && (
                        <p id="err-out" role="alert" className="mt-1 text-xs font-semibold text-red-600">
                          {errors.checkOut}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="guests" className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-bold text-forest">
                        <Users size={13} aria-hidden /> Guests
                      </label>
                      <select
                        id="guests"
                        value={form.guests}
                        onChange={set("guests")}
                        aria-invalid={!!errors.guests}
                        className={inputCls(errors.guests)}
                      >
                        {["1", "2", "3", "4", "5-10", "10-20", "20+"].map((g) => (
                          <option key={g} value={g}>
                            {g} {g === "1" ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="bk-name" className="mb-1.5 block text-[12.5px] font-bold text-forest">
                        Your name
                      </label>
                      <input
                        id="bk-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        value={form.name}
                        onChange={set("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                        className={inputCls(errors.name)}
                      />
                      {errors.name && (
                        <p id="err-name" role="alert" className="mt-1 text-xs font-semibold text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bk-phone" className="mb-1.5 block text-[12.5px] font-bold text-forest">
                        Phone
                      </label>
                      <input
                        id="bk-phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="10-digit mobile"
                        value={form.phone}
                        onChange={set("phone")}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "err-phone" : undefined}
                        className={inputCls(errors.phone)}
                      />
                      {errors.phone && (
                        <p id="err-phone" role="alert" className="mt-1 text-xs font-semibold text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="bk-msg" className="mb-1.5 block text-[12.5px] font-bold text-forest">
                        Message <span className="font-semibold text-ink/45">(optional)</span>
                      </label>
                      <textarea
                        id="bk-msg"
                        rows={3}
                        placeholder="Anything we should know? Occasion, food needs…"
                        value={form.message}
                        onChange={set("message")}
                        className={`${inputCls()} resize-none`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#1faa55] px-6 py-4 text-[15.5px] font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#178a44]"
                  >
                    <MessageCircle size={19} aria-hidden />
                    Send Enquiry on WhatsApp
                    <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <p className="mt-3.5 text-center text-[12px] leading-relaxed text-ink/55">
                    This is an enquiry request — nothing is booked until the property
                    confirms availability and pricing.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
