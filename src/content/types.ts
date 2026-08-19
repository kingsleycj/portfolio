/**
 * Content types.
 *
 * `Thread` is the spine of the site's positioning: every piece of work is tagged
 * as software engineering, AI systems, or both. Colour follows the tag —
 * terracotta for software, verdigris for AI — so the dual emphasis is visible
 * before anything is read. Tags always render their label as text too, so the
 * distinction survives greyscale and colour-blindness.
 */
export type Thread = "software" | "ai";

export interface ExperienceItem {
  company: string;
  role: string;
  /** Display period, e.g. "04/2026 — Present". */
  period: string;
  location: string;
  /** Renders the live "Present" pip on the timeline. */
  current?: boolean;
  threads: Thread[];
  bullets: string[];
  /** Optional standout attached to the role, e.g. an award. */
  highlight?: string;
}


export interface Project {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  threads: Thread[];
  /** Case-study copy: what it is, how it works, what it achieved. */
  body: string[];
  stack: string[];
  /** Honest status note — shipped state, known limits. Rendered distinctly. */
  status?: string;
  links: ProjectLink[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface SecondaryProject {
  name: string;
  description: string;
  href?: string;
}

export interface SkillGroup {
  title: string;
  /** Drives the group's accent colour. */
  thread: Thread;
  blurb: string;
  items: string[];
}

export interface CurrentItem {
  label: string;
  detail: string;
  thread: Thread;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}
