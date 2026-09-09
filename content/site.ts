/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  FLOWING RIVERS HEALTH — ALL WEBSITE COPY LIVES IN THIS FILE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Allison: this is the only file you need to edit to change words on the site.
 *  Anything between quotes ("like this") is text that appears on the page.
 *  Keep the quotes, change the words, save the file. That's it.
 *
 *  Anything marked [TODO ...] is a placeholder that must be replaced before
 *  launch. The full checklist is in TODO.md at the root of the project.
 *
 *  Compliance reminders (see the brief, section 8):
 *   - Coaching does not treat, cure, diagnose, prevent, or manage any condition.
 *   - Describe stress, anxiety, low mood as what people ARRIVE carrying, never
 *     as something coaching treats.
 *   - Do not add credentials, prices, or testimonials that are not confirmed.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ---------- Types: a missing field is a build error, not a blank section ---- */

export type ImageContent = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type LinkContent = { label: string; href: string };

export type DimensionKey =
  | "mind"
  | "body"
  | "spirit"
  | "environment"
  | "emotions"
  | "sexuality";

export type Dimension = {
  key: DimensionKey;
  label: string;
  gloss: string;
};

export type OfferCard = {
  title: string;
  length: string;
  format: string;
  /** One string. Replace the placeholder once pricing is confirmed. TODO 4 */
  price: string;
  description: string;
  cta: LinkContent;
};

export type Step = { title: string; body: string };

export type FaqItem = { question: string; answer: string };

export type SiteContent = {
  name: string;
  tagline: string;
  legalName: string;
  owner: { firstName: string; fullName: string; role: string };
  location: {
    city: string;
    state: string;
    stateCode: string;
    /** Shown in the footer and used for local search. */
    display: string;
  };
  /** The address the contact form delivers to, also shown on the page. */
  email: string;
  nav: LinkContent[];
  headerCta: LinkContent;
  meta: {
    title: string;
    description: string;
    ogImage: { src: string; width: number; height: number; alt: string };
  };
  hero: {
    h1: string;
    sub: string;
    primaryCta: LinkContent;
    secondaryCta: LinkContent;
    trustLine: string;
    image: ImageContent;
  };
  about: {
    eyebrow: string;
    heading: string;
    /** Opening paragraphs (E-06, E-07, E-08, E-10). */
    paragraphs: string[];
    /** "That could be in:" intro + list (E-11). Rendered as a quiet <ul>. */
    focus: { intro: string; items: string[] };
    /** Paragraph(s) after the list (E-12). */
    closing: string[];
    credentialsEyebrow: string;
    credentials: string[];
    image: ImageContent;
  };
  services: {
    eyebrow: string;
    heading: string;
    intro: string;
    quote: { text: string; attribution: string };
    dimensionsHeading: string;
    dimensions: Dimension[];
    offersHeading: string;
    offers: OfferCard[];
    offersNote: string;
    /** E-23. Rendered in sentence case, navy, below the payment line. */
    discountNote: string;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    intro: string;
    steps: Step[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: FaqItem[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    intro: string;
    form: {
      name: { label: string; error: string };
      email: { label: string; error: string };
      phone: { label: string; hint: string };
      message: { label: string; placeholder: string; error: string };
      format: { legend: string; options: string[] };
      consent: {
        labelBefore: string;
        linkText: string;
        labelAfter: string;
        error: string;
      };
      submit: string;
      submitting: string;
      success: { heading: string; body: string };
      error: { heading: string; bodyBefore: string; bodyAfter: string };
      rateLimited: string;
    };
  };
  footer: {
    disclaimer: string;
    crisisLine: string;
    privacyLink: LinkContent;
    homeLink: LinkContent;
  };
  privacy: {
    title: string;
    metaDescription: string;
    updated: string;
    intro: string;
    sections: { heading: string; body: string[] }[];
  };
};

/* ---------- The content -------------------------------------------------- */

export const site: SiteContent = {
  name: "Flowing Rivers Health", // confirmed (E-37)
  tagline: "Holistic Nurse Coaching",
  legalName: "Flowing Rivers Health", // confirmed (E-37)
  owner: {
    firstName: "Allison",
    fullName: "Allison Scobie", // confirmed by E-04
    role: "Holistic Nurse Coach",
  },
  location: {
    city: "Durango",
    state: "Colorado",
    stateCode: "CO",
    display: "Durango, Colorado",
  },
  email: "Allison.RN@flowingrivershealth.com", // E-35 / E-38

  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  headerCta: { label: "Get in touch", href: "#contact" },

  meta: {
    title: "Flowing Rivers Health | Holistic Nurse Coaching in Durango, CO",
    description:
      "Holistic nurse coaching in Durango, Colorado with Allison. A calm, practical place to work through stress and build habits that last. In person or online. Start with a free 20-minute call.",
    ogImage: {
      src: "/og.jpg",
      width: 1200,
      height: 630,
      alt: "Flowing Rivers Health logo: a heart with a river flowing through it",
    },
  },

  hero: {
    h1: "Holistic nurse coaching in Durango, Colorado.",
    // TODO 18: "adults and children" vs the FAQ's audience is unresolved (edits doc 1.5).
    // TODO 19: "20 years of nursing experience" vs About's "20 years Army + 10+ years hospital". Verbatim from Allison; do not adjust.
    sub: "A calm, practical place to work through stress, get grounded, and build habits that hold. For adults and children in the Durango area, in person or online. Sessions are offered by a Registered Nurse with 20 years of nursing experience.",
    primaryCta: { label: "Book a free consult", href: "#contact" },
    secondaryCta: { label: "What is nurse coaching?", href: "#about" },
    trustLine: "Allison Scobie MPH, BSN, RN · Durango, Colorado", // E-04, verbatim
    image: {
      src: "/images/hero.jpg", // confirmed: the seated portrait (edits doc section 12)
      alt: "Allison, a holistic nurse coach, sitting cross-legged on a wooden floor and smiling",
      width: 1092,
      height: 1456,
    },
  },

  about: {
    eyebrow: "About",
    heading: "Hi, I'm Allison!",
    paragraphs: [
      // TODO 27: confirm E-06 wording ("I'm a Registered Nurse"); the markup was ambiguous.
      "I'm a Registered Nurse in Durango, Colorado. After working as a Nurse in the U.S. Army for 20 years and as an in-patient Case Manager for 10+ years at a regional hospital, I decided to transform my nursing practice to focus more on the wellness of the whole person.",
      "For years I watched people leave appointments with a diagnosis and a prescription, but not much room to talk about what was actually going on in their lives. Coaching is the part of nursing I always wanted more of. I've realized that human connection and providing a non-judgmental space for you to grow is vital for you to create change and live a healthy and happy life.",
    ],
    focus: {
      intro:
        "I combine my knowledge as a RN with the science of holistic health and wellness coaching to provide client-centered care in order to help you make positive lifestyle changes — that could be in:",
      items: [
        // TODO 28: Allison's markup says "Stress & anxiety management" and "Chronic illness".
        // "Management" is the verb the compliance rules prohibit, so the recommended
        // placeholders are shown until she signs off on wording (edits doc E-11).
        "Living with stress and anxiety",
        "Living with chronic illness",
        "Mindfulness",
        "Poor sleep and low energy",
        "Reconnecting with goals and values",
      ],
    },
    closing: [
      "Working with me is mostly a conversation. I ask questions, and I listen to the answers. We look at the whole picture: how you sleep, what you eat, where your time goes, what you believe about yourself, and who is around you. Then we pick one or two things to change and see how they hold.",
    ],
    credentialsEyebrow: "Credentials",
    // E-14, verbatim from Allison. No board certification exists; do not add one.
    // TODO 22: confirm the 2026 certificate is awarded, not in progress.
    credentials: [
      "Registered Nurse (RN) — Colorado Board of Nursing",
      "Master of Public Health — Colorado School of Public Health (2017)",
      "Bachelor of Science in Nursing — Creighton University (2007)",
      "Transformative Nurse Coach Certificate — The Nurse Coach Collective (2026)",
    ],
    image: {
      src: "/images/allison.jpg", // TODO 7: 1242px on the long edge, below the 1600px bar. Ask for the original.
      alt: "Portrait of Allison smiling, with dark hair and a navy top, against a warm beige background",
      width: 714,
      height: 892,
    },
  },

  services: {
    eyebrow: "Services",
    heading: "Coaching for the whole of your life, not one corner of it.",
    intro:
      "Health does not live in one place. How you sleep, what you believe, who you spend time with, and how you feel in your own body all pull on each other. Holistic nurse coaching looks at all of it, and then helps you change what you actually want to change.",
    quote: {
      // E-16, verbatim. TODO 14: the yoga addition belongs in the compliance/scope review.
      text: "I provide health coaching through the holistic model, focusing on mind, body, spirituality, environment, emotions, and sexuality. I use guided inquiry, reflection, mindfulness practices, yoga / mindful movement, and visualization to help the client make lasting lifestyle changes.",
      attribution: "Allison",
    },
    dimensionsHeading: "The six dimensions we work with",
    dimensions: [
      {
        key: "mind",
        label: "Mind",
        gloss: "Thought patterns, focus, and the stories running underneath them.",
      },
      {
        key: "body",
        label: "Body",
        gloss: "Movement, sleep, food, and energy. What your body is telling you.",
      },
      {
        key: "spirit",
        label: "Spirit",
        gloss: "Meaning and connection, whatever those mean to you.",
      },
      {
        key: "environment",
        label: "Environment",
        gloss: "Your home, your work, and the people and places around you.",
      },
      {
        key: "emotions",
        label: "Emotions",
        gloss: "Naming what you feel and learning to sit with it.",
      },
      {
        key: "sexuality",
        label: "Sexuality",
        gloss: "Intimacy and your relationship with your body, discussed without embarrassment.",
      },
    ],
    offersHeading: "Ways to work together",
    offers: [
      {
        title: "Free discovery call", // confirmed (E-18)
        length: "20 minutes",
        format: "Phone or video",
        price: "Free",
        description:
          "A short, no-pressure conversation to hear what is going on and decide together whether coaching is a good fit.",
        cta: { label: "Book a call", href: "#contact" },
      },
      {
        title: "First coaching session",
        length: "60 minutes",
        format: "In person or virtual",
        // TODO 4: $100 was in the copy Allison marked up and she left it unchanged (E-19). Verify before launch.
        price: "$100",
        description:
          "A full hour to talk through what is happening, notice what is pulling on you, and choose what to work on next.",
        cta: { label: "Get in touch", href: "#contact" },
      },
      {
        title: "Starter Package",
        length: "Ten 60 minute sessions",
        format: "In person or virtual",
        // TODO 16: her assets doc says $1,000; her marked-up edit says "Price agreed upon". Built as marked.
        price: "Price agreed upon",
        // TODO 21: Practice Better / EHR / messaging details deliberately left out (HIPAA wording risk).
        description:
          "We will create a package that works for you. Our first session will consist of a holistic health assessment, examining all aspects of your life. We will create goals and direction for following sessions.",
        cta: { label: "Get in touch", href: "#contact" },
      },
      {
        title: "Extended session",
        length: "90 minutes",
        format: "In person or virtual",
        // TODO 4: $150 was in the copy Allison marked up and she left it unchanged (E-20). Verify before launch.
        price: "$150",
        description:
          "Extra room for a first meeting, a big decision, or a season of life that needs more than an hour.",
        cta: { label: "Get in touch", href: "#contact" },
      },
    ],
    offersNote: "Insurance is not accepted. Sessions are paid directly.",
    // E-23. TODO 17: scope unclear (all sessions vs Starter Package only; "active military" is new).
    // TODO 29: Allison wrote this in all caps; rendered in sentence case per the style rules.
    discountNote:
      "25% discount for active military, veterans, first responders, and teachers.",
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "Three steps, none of them a leap.",
    intro: "There is no program to sign up for and no commitment on the first call.",
    steps: [
      {
        title: "A free 20-minute call.",
        body: "We talk about what brought you here and whether coaching is the right fit. No pressure, and nothing to prepare.",
      },
      {
        title: "We set the direction together.",
        // E-26. If the Starter Package leaves the page, the second sentence goes too.
        body: "Through guided inquiry and reflection, we work out what matters most to you right now and where to start. Then we develop a package that works for you.",
      },
      {
        title: "We meet regularly and adjust.",
        body: "Lasting change comes from small steps that fit your actual life. We check in, notice what is working, and refine.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Questions people ask before they get in touch",
    items: [
      {
        question: "What is a holistic nurse coach?",
        answer:
          "A holistic nurse coach is a nurse who uses coaching skills, not clinical treatment, to help you make lasting changes in how you live. We look at your whole life, not one symptom. A doctor diagnoses and treats. A therapist works with mental health conditions. A coach helps you decide what you want to change and supports you while you do it.",
      },
      {
        question: "Is this therapy?",
        answer:
          "No. Holistic nurse coaching is not psychotherapy, medical care, or a substitute for treatment from your physician or mental health provider. Coaching does not diagnose or treat medical or psychiatric conditions. Many clients work with a therapist or doctor alongside coaching, and that is a good combination. If you are in crisis or thinking of suicide, call or text 988.",
      },
      {
        question: "Do you take insurance?",
        answer:
          // E-30, verbatim. TODO 30: "directly" appears twice; her words, flagged for a lighter edit.
          "No. I currently do not take insurance. Sessions are paid directly. If you have questions about cost, ask on the free intro call and I will answer them directly, before you commit to anything.",
      },
      {
        // E-31: approved as written.
        question: "How long do people usually work with you?",
        answer:
          "It depends on what you are working on. Some people come for a few sessions to get unstuck on one thing. Others meet every couple of weeks for several months while a bigger change settles in. There is no set program and no minimum commitment. We decide the pace together and adjust as we go.",
      },
      {
        question: "Do you meet in person or online?",
        answer:
          "Both. I meet clients in person in Durango, Colorado, and by video for anyone who prefers it or lives farther out. Most people settle into one format, but you can switch when life calls for it. Choose the format you prefer on the contact form, or say you are open to either.",
      },
      {
        // E-33. TODO 18: Allison's markup says "Women"; that contradicts the hero, so the
        // current word "Adults" stays until she decides (edits doc 1.5). Everything else is verbatim.
        question: "Who do you work with?",
        answer:
          "Adults between about 25 and 65 who are experiencing high levels of stress and/or moderate anxiety. I also work with people navigating chronic illness, experiencing low energy and/or poor sleep, and those interested in adding mindfulness practices to their daily life. I also work with children under 12, together with a parent. I do not work with teenagers.",
      },
      {
        question: "What happens in a first session?",
        answer:
          // E-34, verbatim ("holist" typo corrected). TODO 31: "diving deep into" could be lightened if she is open to it.
          "Mostly, we talk. I will ask about what brought you here, what a good day looks like, and what has and has not worked before. We conduct a full holistic health assessment diving deep into the six areas of the holistic health model. By the end, you will have one or two small, specific things to try before we meet again.",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    heading: "Get in touch",
    // TODO 23: confirm the two-business-day reply promise with Allison.
    intro:
      "Tell me a little about what's going on. I'll reply within two business days.",
    form: {
      name: { label: "Name", error: "Please tell me your name." },
      email: {
        label: "Email",
        error: "Please enter an email address I can reply to.",
      },
      phone: { label: "Phone", hint: "Optional" },
      message: {
        label: "What brings you here?",
        placeholder:
          "What's been on your mind lately, and what would you like to be different?",
        error: "A sentence or two is plenty, but I do need something to go on.",
      },
      format: {
        legend: "Preferred format",
        options: ["In person", "Virtual", "Either"],
      },
      consent: {
        labelBefore:
          "I understand this form is not a secure medical channel and I should not include sensitive health information. I have read the ",
        linkText: "privacy policy",
        labelAfter: ".",
        error: "Please check this box so I know you understand.",
      },
      submit: "Send message",
      submitting: "Sending",
      success: {
        heading: "Thank you. Your message is on its way.",
        body: "I'll reply within two business days, usually sooner. If it's easier, you can also reply to the confirmation from your email.",
      },
      error: {
        heading: "Something went wrong and your message did not send.",
        bodyBefore: "Please email me directly at ",
        bodyAfter: " and I will get back to you.",
      },
      rateLimited:
        "You have sent a few messages already. Please wait a little while, or email me directly.",
    },
  },

  footer: {
    disclaimer:
      "Holistic nurse coaching is not psychotherapy, medical care, or a substitute for treatment from your physician or mental health provider. Coaching does not diagnose or treat medical or psychiatric conditions.",
    crisisLine: "If you are in crisis, call or text 988 (Suicide & Crisis Lifeline).",
    privacyLink: { label: "Privacy", href: "/privacy" },
    homeLink: { label: "Home", href: "/" },
  },

  privacy: {
    title: "Privacy",
    metaDescription:
      "What the Flowing Rivers Health website collects, what it does with it, and how to ask for it to be deleted.",
    updated: "September 2026",
    intro:
      "This site is small, and so is this policy. Here is exactly what happens with anything you share.",
    sections: [
      {
        heading: "What the contact form collects",
        body: [
          "The form asks for your name, your email address, an optional phone number, a short note about what brings you here, and your preferred session format. That is all.",
          "Please do not include sensitive health details in the form. It is ordinary email, not a secure medical channel. Save the specifics for when we talk.",
        ],
      },
      {
        heading: "Where it goes",
        body: [
          "When you press send, your message is emailed to me, Allison. It is not stored on this website or in any database. It lives in my email inbox, the same as if you had written to me directly.",
          "The email is delivered by a service called Resend, which handles the sending. It does not use your details for anything else.",
        ],
      },
      {
        heading: "Cookies and tracking",
        body: [
          "This site sets no tracking cookies and uses no advertising pixels, analytics scripts, or session recording. There is no cookie banner because there is nothing to consent to.",
        ],
      },
      {
        heading: "Asking me to delete your message",
        body: [
          "Email me at the address in the footer and I will delete your message from my inbox and confirm when it is done. No forms, no waiting period.",
        ],
      },
    ],
  },
};

/* ---------- Small interface strings (labels for screen readers, buttons) --- */

export type UiStrings = {
  wordmark: { line1: string; line2: string };
  skipLink: string;
  mainNav: string;
  footerNav: string;
  openMenu: string;
  closeMenu: string;
  optional: string;
  honeypotLabel: string;
  contactEmailPrompt: string;
  contactLocationPrompt: string;
  backHome: string;
  lastUpdated: string;
};

export const ui: UiStrings = {
  wordmark: { line1: "Flowing Rivers", line2: "Health" }, // confirmed (E-37)
  skipLink: "Skip to content",
  mainNav: "Main",
  footerNav: "Footer",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  optional: "Optional",
  honeypotLabel: "Leave this field empty",
  contactEmailPrompt: "Prefer email? Write to",
  contactLocationPrompt: "In person in",
  backHome: "Back to the home page",
  lastUpdated: "Last updated",
};
