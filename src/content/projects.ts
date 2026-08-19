import type { Project, SecondaryProject } from "./types";

/**
 * Case studies, not a link grid. Each one leads with what makes it interesting
 * rather than what it is, because "task marketplace" tells you nothing and
 * "money that cannot drift" tells you everything.
 *
 * VibeCraft and DojoPay are written from their repositories, which are far more
 * interesting than the résumé's two lines each. `status` carries honest
 * limitations where they exist — shipped-and-candid beats an inflated claim.
 */
export const projects: Project[] = [
  {
    slug: "vibecraft",
    name: "VibeCraft",
    tagline: "Four AI providers, one interface, zero refactors",
    period: "04/2026 — Present",
    threads: ["ai", "software"],
    body: [
      "An AI creative suite whose backend I own outright. The fun problem wasn't wiring up a model — it was making the model a detail.",
      "Everything sits behind one provider interface: Groq, Anthropic, and a self-hosted backend, with matching routers for speech-to-text and image generation. Switching provider is a config change, not a refactor. That's how transcription moved onto a cheaper host one afternoon without a single caller noticing.",
      "Underneath, it's Node, Express and TypeScript on PostgreSQL, streaming to the client over SSE and containerised with Docker Compose. I also spent real time costing self-hosted open models on dedicated GPUs against per-token pricing — the kind of question that only gets answered by actually running it.",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Python",
      "FastAPI",
      "Docker Compose",
      "SSE",
      "Groq",
      "Anthropic",
      "Whisper",
    ],
    links: [],
  },
  {
    slug: "dojopay",
    name: "DojoPay",
    tagline: "Strangers, real money, and no reason to trust each other",
    period: "12/2025 — Present",
    threads: ["ai", "software"],
    body: [
      "A marketplace on Solana where people are paid in SOL for small pieces of human judgement. Right now that means picking the best image from a set — which quietly makes it a labelling pipeline with payment built in.",
      "Almost all the difficulty is in money that cannot drift. Funding a task moves budget from available to reserved in the same transaction that creates it, so a task can never exist unfunded. Every balance change writes an append-only ledger entry, and one that would go negative aborts rather than persists. Capacity is a conditional update, so two workers racing for the last slot can't both win it.",
      "Withdrawals are signed over the exact amount and destination, so a captured signature can't authorise a bigger one later. Admins get their own surface with mandatory TOTP and no ability to move money at all.",
    ],
    stack: [
      "Node.js 22",
      "Express 5",
      "Prisma",
      "PostgreSQL",
      "Next.js 14",
      "Tailwind",
      "shadcn/ui",
      "Recharts",
      "Solana",
      "Anchor (Rust)",
      "Cloudflare R2",
    ],
    status:
      "Devnet, pre-production. Payouts are still custodial — the Anchor escrow program that fixes that is written and building, but not yet deployed or audited.",
    links: [{ label: "Live site", href: "https://dojopay.vercel.app/" }],
  },
  {
    slug: "simbi-ai",
    name: "SIMBI-AI Bot",
    tagline: "A study buddy that lives in Telegram and remembers you",
    period: "04/2025 — Present",
    threads: ["ai"],
    body: [
      "Students ask it academic questions; it answers. The twist is underneath — identity, access and rewards all run on a smart contract, so the bot knows who you are without holding an account for you.",
      "Participation earns tokens and NFTs. It fielded over 300 student questions during its Learnable demo run, which was the first time I'd watched something I built get used by strangers in real time.",
    ],
    stack: ["Telegram Bot API", "Solidity", "Smart contracts", "NFTs"],
    links: [{ label: "Source", href: "https://github.com/kingsleycj/simbi-bot" }],
  },
  {
    slug: "gngn-token",
    name: "gNGN Token",
    tagline: "A central bank's rulebook, expressed in Solidity",
    period: "05/2025 — 06/2025",
    threads: ["software"],
    body: [
      "A tokenised naira prototype built against Central Bank of Nigeria–style requirements rather than against what was convenient to implement.",
      "Minting, pausing and burning in tested Solidity, then multi-signature simulations run over the approval rules to see whether the flow actually held up under them. It mostly did; the places it didn't were the useful part.",
    ],
    stack: ["Solidity", "Hardhat", "ERC-20", "Multi-signature"],
    links: [{ label: "Source", href: "https://github.com/kingsleycj/gnaira-token" }],
  },
];

/** Earlier and supporting work — one line each, no case study. */
export const secondaryProjects: SecondaryProject[] = [
  {
    name: "CivicLink",
    description:
      "Decentralised civic identity. I built the contract functions behind identity creation and secure access; the prototype survived a full demo-week run.",
    href: "https://github.com/kingsleycj/civic-IdentityW3",
  },
  {
    name: "Tutera",
    description:
      "A multi-tenant LMS for institutions and creators. I was on the backend team at Genesys Tech Hub.",
  },
  {
    name: "eBuzz",
    description:
      "A campus media app. I wrote the backend for registration, login and posting, then watched 50+ students use it in launch week.",
    href: "https://github.com/esutBuzz/ebuzz-backend",
  },
  {
    name: "Medbloc",
    description:
      "Digital health records. API endpoints for patient data, hospital registration and scheduling, with validation and role-based access throughout.",
    href: "https://github.com/learnable-2022/DPR-4-BE",
  },
];
