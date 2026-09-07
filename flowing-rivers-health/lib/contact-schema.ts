import * as z from "zod/mini";
import { site } from "@/content/site";

/*
 * zod/mini is the tree-shakeable build of zod 4: same validation, a fraction
 * of the JavaScript shipped to the browser. It is wired into react-hook-form
 * through the Standard Schema resolver (see components/ContactForm.tsx).
 */

const f = site.contact.form;
const formatOptions = f.format.options as [string, ...string[]];

/** Shared by the browser form and the API route so both validate identically. */
export const contactSchema = z.object({
  name: z
    .string()
    .check(z.trim(), z.minLength(1, f.name.error), z.maxLength(120, f.name.error)),
  email: z.email(f.email.error).check(z.maxLength(200, f.email.error)),
  phone: z.nullish(z.string().check(z.trim(), z.maxLength(40))),
  message: z
    .string()
    .check(z.trim(), z.minLength(10, f.message.error), z.maxLength(3000, f.message.error)),
  /* An unselected radio group arrives as null from react-hook-form. */
  format: z.nullish(z.enum(formatOptions)),
  consent: z.boolean().check(z.refine((v) => v === true, { error: f.consent.error })),
});

export type ContactValues = z.infer<typeof contactSchema>;

/** What the browser actually posts: the form values plus two spam checks. */
export const contactPayloadSchema = z.extend(contactSchema, {
  /** Honeypot. Humans never see it, so it must be empty. */
  website: z.optional(z.string().check(z.maxLength(200))),
  /** Milliseconds between the form appearing and being submitted. */
  elapsedMs: z.number().check(z.nonnegative()),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
