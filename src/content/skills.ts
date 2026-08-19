import type { CurrentItem, SkillGroup } from "./types";

/**
 * Grouped by what the work actually is, not one flat tag cloud.
 * Thread drives the accent colour: terracotta for software, verdigris for AI.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Backend & Platform",
    thread: "software",
    blurb: "Where most of my hours go — and where I'm hardest to surprise.",
    items: [
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Redis",
      "REST APIs",
      "JWT",
      "Docker",
      "CI/CD",
      "AWS",
      "Swagger",
      "Postman",
    ],
  },
  {
    title: "AI Systems",
    thread: "ai",
    blurb:
      "The layer under the model. Newest to me, and the one I'm pushing hardest on.",
    items: [
      "Python",
      "FastAPI",
      "LLM provider routing",
      "Groq",
      "Anthropic",
      "OpenAI",
      "SSE streaming",
      "Whisper speech-to-text",
      "Image generation pipelines",
      "Self-hosted model evaluation",
      "GPU inference infrastructure",
      "Inference cost engineering",
    ],
  },
  {
    title: "Frontend",
    thread: "software",
    blurb: "Enough to ship the whole thing myself when a project needs that.",
    items: [
      "React",
      "Next.js (App Router)",
      "Tailwind CSS",
      "shadcn/ui",
      "Recharts",
    ],
  },
  {
    title: "Blockchain",
    thread: "software",
    blurb: "Three years of contracts, tokens and money that has to land.",
    items: [
      "Solidity",
      "Hardhat",
      "ERC-20",
      "Solana",
      "Anchor (Rust)",
      "SPL",
      "Web3.js",
      "Ethers.js",
      "Solana Wallet Adapter",
      "Remix",
    ],
  },
  {
    title: "Ways of working",
    thread: "software",
    blurb: "The habits that make everything above survive contact with a team.",
    items: [
      "Agile / Scrum",
      "Git & GitHub",
      "Code review",
      "API documentation",
      "Technical writing",
      "Cross-team collaboration",
    ],
  },
];

/** Live signal. Every line here is genuinely in progress, not aspiration. */
export const currently: CurrentItem[] = [
  {
    label: "Making models a config change",
    detail:
      "Inside VibeCraft's AI service at TekAIDA — provider routing, transcription, and the arithmetic of self-hosting versus paying per token.",
    thread: "ai",
  },
  {
    label: "Learning Rust the hard way",
    detail:
      "Taking DojoPay's Anchor escrow from written-and-building to actually deployed. It is the step that gets custody out of my hands, and it is teaching me a lot.",
    thread: "software",
  },
  {
    label: "Keeping 500+ people's data boring",
    detail:
      "Ongoing backend work at HarmonyKloud. Boring is the goal — nobody should ever notice this one.",
    thread: "software",
  },
];
