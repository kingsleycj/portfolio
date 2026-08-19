import type { SocialLink } from "./types";

/**
 * The hero line, split so one phrase can carry a highlight without the sentence
 * being written twice. `profile.valueProp` is composed from these, so metadata
 * and the visible headline can never drift apart.
 */
export const valuePropParts = {
  before: "Four years in, and the part I still like best is ",
  emphasis: "the bit I haven't figured out yet",
  after: ".",
} as const;

/** Cycles under the name. Ends open on purpose. */
export const rotatorWords = [
  "backends that stay up",
  "payment rails that balance",
  "AI that isn't a demo",
  "whatever I haven't tried yet",
] as const;

export const profile = {
  name: "Kingsley Nweke",
  /** Feeds the metadata description, so the page's promise and its search
      snippet cannot drift apart. */
  valueProp: `${valuePropParts.before}${valuePropParts.emphasis}${valuePropParts.after}`,
  location: "Lagos, Nigeria",
  availability: "Open to what's next",
  email: "primekings.kc@gmail.com",
  phone: "+234 814 542 4408",
  phoneHref: "tel:+2348145424408",
  resumePath: "/kingsley-nweke-resume.pdf",
  siteUrl: "https://kingsleynweke.vercel.app",
} as const;

/**
 * About copy. Written as someone talking, not as a résumé being read aloud.
 * Forward-looking by design: what he wants next matters more here than a list
 * of what he has already shipped — that is what the rest of the page is for.
 */
export const about = {
  heading: "Still mostly curious",
  body: [
    "I got into this the way a lot of people do — by breaking something and needing to know why. That is still, more or less, the job.",
    "Since then: backends for a healthcare platform, smart contracts that move real money, and lately a lot of time inside AI infrastructure. Different worlds, same pull. I want to know how the thing actually works underneath, not just how to call it.",
    "What I'm after next is less about a particular stack and more about a problem I haven't met before. Most of what I'm good at now, I was useless at eighteen months ago — and I'd like to keep that streak going.",
  ],
  /** The closing beat, set apart from the paragraphs above it. */
  closing: [
    "Curious by default.",
    "Quick on unfamiliar ground.",
    "Allergic to hand-waving.",
  ],
} as const;

/** Sidebar facts. Short enough to scan without reading the narrative. */
export const quickFacts = [
  { label: "Based in", value: "Lagos, Nigeria" },
  { label: "Building since", value: "2022" },
  { label: "Happiest when", value: "the problem is new" },
] as const;

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/kingsleycj",
    handle: "@kingsleycj",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/kingsleycj",
    handle: "in/kingsleycj",
  },
];
