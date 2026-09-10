"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin } from "lucide-react";
import { site, ui } from "@/content/site";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { cx } from "@/lib/cx";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { RiverDivider } from "@/components/ui/RiverDivider";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-river-700/80 transition-colors focus:border-navy-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-600";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-terracotta-700">
      <CircleAlert aria-hidden="true" size={16} className="mt-[3px] shrink-0" />
      <span>{message}</span>
    </p>
  );
}

export function ContactForm() {
  const { contact } = site;
  const f = contact.form;
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  const [status, setStatus] = useState<Status>("idle");
  /* When the form first rendered, for the minimum time-to-submit check. */
  const [startedAt] = useState(() => Date.now());
  const successRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") alertRef.current?.focus();
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: standardSchemaResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", consent: false },
  });

  const onSubmit = async (
    values: ContactValues,
    event?: React.BaseSyntheticEvent,
  ) => {
    setStatus("submitting");
    const form = event?.target as HTMLFormElement | undefined;
    const honeypot = form ? String(new FormData(form).get("website") ?? "") : "";
    /* Submissions go to Netlify Forms (see public/__forms.html). Netlify
       emails them to the address configured in its dashboard and runs its
       own spam filtering; the honeypot field is discarded there too. */
    try {
      const body = new URLSearchParams({
        "form-name": "contact",
        name: values.name,
        email: values.email,
        phone: values.phone ?? "",
        message: values.message,
        format: values.format ?? "",
        consent: values.consent ? "yes" : "no",
        website: honeypot,
        elapsedMs: String(Date.now() - startedAt),
      }).toString();
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const mailto = `mailto:${site.email}`;

  return (
    <>
      {/* Motif use 3 of 3 */}
      <RiverDivider className="bg-cream" />
      <Section id="contact" labelledBy="contact-heading" className="!pt-10 md:!pt-14">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="contact-heading" eyebrow={contact.eyebrow}>
              {contact.heading}
            </SectionHeading>
            {/* TODO 23: confirm the reply-time promise. */}
            <p className="mt-6 max-w-prose">{contact.intro}</p>

            <ul className="mt-8 space-y-4 text-[16px]">
              <li className="flex items-start gap-3">
                <Mail aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-terracotta-500" />
                <span>
                  <span className="block text-sm text-river-700">{ui.contactEmailPrompt}</span>
                  {/* E-35: terracotta-700 so it reads as a link at body size. */}
                  <a href={mailto} className="rounded font-medium text-terracotta-700 underline decoration-terracotta-700/40 underline-offset-4 hover:decoration-terracotta-700">
                    {site.email}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-terracotta-500" />
                <span>
                  <span className="block text-sm text-river-700">{ui.contactLocationPrompt}</span>
                  {/* TODO 12: physical address, if she wants one listed */}
                  <span className="font-medium text-navy-700">{site.location.display}</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            {status === "success" ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="rounded-2xl border border-river-300/40 bg-sand p-8 md:p-10"
              >
                <CircleCheck aria-hidden="true" size={32} strokeWidth={1.5} className="text-terracotta-500" />
                <h3 className="mt-4 text-2xl">{f.success.heading}</h3>
                <p className="mt-3 max-w-prose">{f.success.body}</p>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={(e) => void handleSubmit(onSubmit)(e)}
                className="rounded-2xl border border-river-300/40 bg-sand p-6 sm:p-8 md:p-10"
              >
                {status === "error" && (
                  <div
                    ref={alertRef}
                    tabIndex={-1}
                    role="alert"
                    className="mb-6 rounded-xl border border-terracotta-700/40 bg-cream p-4 text-[16px]"
                  >
                    <p className="flex items-start gap-2 font-semibold text-terracotta-700">
                      <CircleAlert aria-hidden="true" size={20} className="mt-[3px] shrink-0" />
                      <span>{f.error.heading}</span>
                    </p>
                    <p className="mt-2 pl-7">
                      {f.error.bodyBefore}
                      <a href={mailto} className="rounded font-medium text-navy-700 underline underline-offset-4">
                        {site.email}
                      </a>
                      {f.error.bodyAfter}
                    </p>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={id("name")} className="mb-2 block font-medium text-navy-700">
                      {f.name.label}
                    </label>
                    <input
                      id={id("name")}
                      type="text"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? id("name-error") : undefined}
                      className={cx(inputBase, errors.name ? "border-terracotta-700" : "border-river-300/70")}
                      {...register("name")}
                    />
                    <FieldError id={id("name-error")} message={errors.name?.message} />
                  </div>

                  <div>
                    <label htmlFor={id("email")} className="mb-2 block font-medium text-navy-700">
                      {f.email.label}
                    </label>
                    <input
                      id={id("email")}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? id("email-error") : undefined}
                      className={cx(inputBase, errors.email ? "border-terracotta-700" : "border-river-300/70")}
                      {...register("email")}
                    />
                    <FieldError id={id("email-error")} message={errors.email?.message} />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor={id("phone")} className="mb-2 block font-medium text-navy-700">
                    {f.phone.label}{" "}
                    <span className="text-sm font-normal text-river-700">({f.phone.hint})</span>
                  </label>
                  <input
                    id={id("phone")}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className={cx(inputBase, "border-river-300/70")}
                    {...register("phone")}
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor={id("message")} className="mb-2 block font-medium text-navy-700">
                    {f.message.label}
                  </label>
                  <textarea
                    id={id("message")}
                    rows={4}
                    placeholder={f.message.placeholder}
                    aria-required="true"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? id("message-error") : undefined}
                    className={cx(inputBase, "resize-y", errors.message ? "border-terracotta-700" : "border-river-300/70")}
                    {...register("message")}
                  />
                  <FieldError id={id("message-error")} message={errors.message?.message} />
                </div>

                <fieldset className="mt-6">
                  <legend className="mb-3 font-medium text-navy-700">
                    {f.format.legend}{" "}
                    <span className="text-sm font-normal text-river-700">({ui.optional})</span>
                  </legend>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {f.format.options.map((opt) => (
                      <label key={opt} className="inline-flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          value={opt}
                          className="h-4 w-4 accent-terracotta-600"
                          {...register("format")}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6">
                  <div className="flex items-start gap-3">
                    <input
                      id={id("consent")}
                      type="checkbox"
                      aria-required="true"
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? id("consent-error") : undefined}
                      className="mt-1.5 h-4 w-4 shrink-0 accent-terracotta-600"
                      {...register("consent")}
                    />
                    <label htmlFor={id("consent")} className="text-[15px] leading-relaxed">
                      {f.consent.labelBefore}
                      <a href={site.footer.privacyLink.href} className="rounded font-medium text-navy-700 underline underline-offset-4">
                        {f.consent.linkText}
                      </a>
                      {f.consent.labelAfter}
                    </label>
                  </div>
                  <FieldError id={id("consent-error")} message={errors.consent?.message} />
                </div>

                {/* Honeypot: off-screen, not display:none, ignored by people. */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                >
                  <label htmlFor={id("website")}>{ui.honeypotLabel}</label>
                  <input
                    id={id("website")}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="mt-8">
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="w-full sm:w-auto"
                  >
                    {status === "submitting" ? (
                      <>
                        <LoaderCircle aria-hidden="true" size={18} className="animate-spin" />
                        {f.submitting}
                      </>
                    ) : (
                      f.submit
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
