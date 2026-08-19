import type { ExperienceItem } from "./types";

/**
 * Reverse-chronological. Facts are from resume/resume.pdf, but written as
 * sentences a person would say out loud — not lifted bullet-for-bullet.
 */
export const experience: ExperienceItem[] = [
  {
    company: "TekAIDA Consulting",
    role: "Backend Developer",
    period: "04/2026 — Present",
    location: "Remote — Bedford, England, UK",
    current: true,
    threads: ["software", "ai"],
    bullets: [
      "Sole backend engineer on VibeCraft, an AI creative suite. I own it end to end — first architecture sketch through to the box it runs on.",
      "Node, Express and TypeScript over PostgreSQL, containerised with Docker Compose and shipped to a VPS.",
      "Wrote the API reference the frontend team builds against: auth, projects, conversations, SSE streaming, pagination. If it's ambiguous, it's my fault.",
      "Worked out whether self-hosting open models on our own GPUs beats paying per token. Sometimes it does — which was the interesting part.",
    ],
  },
  {
    company: "HarmonyKloud",
    role: "Backend Developer",
    period: "06/2025 — Present",
    location: "Remote — Texas, United States",
    current: true,
    threads: ["software"],
    bullets: [
      "Backend work on a US healthcare platform used by 500+ people.",
      "APIs for the parts that have to be right, and integrations with Waystar and Office Ally to keep them in sync.",
      "A fair amount of unglamorous reliability work: deployment flow, error handling, the things that stop a bad night happening.",
    ],
  },
  {
    company: "Genesys Tech Hub",
    role: "Web3 Developer",
    period: "12/2024 — 12/2025",
    location: "Hybrid — Enugu, Nigeria",
    threads: ["software", "ai"],
    bullets: [
      "Shipped smart contracts across three-plus projects in Solidity and Hardhat.",
      "Built gNGN, a tokenised naira modelled on central-bank rules — mint, burn, pause and multi-signature approvals, all tested against the rules rather than my assumptions.",
      "Helped wire contracts into a civic ID system and an AI Telegram bot during Learnable collaborations.",
      "Backend team on Tutera, a multi-tenant LMS for institutions and creators.",
    ],
    highlight:
      "Nikolai Tesla Award — Web3 Student of the Year, Genesys Tech Hub (12/2025)",
  },
  {
    company: "Genesys Tech Hub",
    role: "Backend Engineer",
    period: "03/2022 — 07/2023",
    location: "Enugu, Nigeria",
    threads: ["software"],
    bullets: [
      "My first real engineering job. Led the backend on client web apps and found out what shipping to a deadline actually costs.",
      "Agile and Scrum, proper code review, and the habit of checking something works before calling it done.",
    ],
  },
];
