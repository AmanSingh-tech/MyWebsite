// Everything personal lives here, so updating the site means editing one file.

export const site = {
  name: "Aman Kumar Singh",
  short: "aman singh",
  email: "pendulum4441@gmail.com",
  location: "Bengaluru, India",
  url: "https://my-website-omega-two.vercel.app",
  disciplines: ["Software Engineering", "Full-Stack Web", "Applied AI", "Competitive Programming"],
  intro: "I'm a software engineer who likes building calm, reliable things.",
  bio: [
    "Hi! I'm Aman, a Computer Science student at Manipal Institute of Technology, Bengaluru (B.Tech, class of 2027, CGPA 8.48).",
    "I've worked on automated QA and agentic LLM systems at Google, built an online judge at AlgoUniversity, and shipped full-stack products end to end. Most days I'm somewhere between a FastAPI service, a Next.js frontend and a contest problem.",
  ],
  links: {
    github: "https://github.com/AmanSingh-tech",
    linkedin: "https://www.linkedin.com/in/aman-singh-9b2a5a237/",
    resume: "https://drive.google.com/file/d/1Ohady_E0Uaevul230wRSfKEgY4WuPCPS/view?usp=sharing",
    codeforces: "https://codeforces.com/profile/vander_wal",
    leetcode: "https://leetcode.com/u/aman_singh-tech/",
    leetcodeAlt: "https://leetcode.com/u/_its_aman_singh_/",
  },
  handles: {
    github: "AmanSingh-tech",
    codeforces: "vander_wal",
    leetcode: ["aman_singh-tech", "_its_aman_singh_"],
  },
  skills: [
    "C++", "Python", "TypeScript", "Java", "SQL",
    "Next.js", "React", "Node.js", "FastAPI", "Prisma",
    "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS",
    "LLMs & RAG", "AI Agents", "OpenCV", "Automated Testing",
  ],
};

export type Case = {
  org: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  tags: string[];
};

export const cases: Case[] = [
  {
    org: "Google",
    role: "Web Solutions Engineer Intern · SWE & Applied AI",
    period: "May – Aug 2026",
    summary: "Automated audit checks and an internal agentic LLM system.",
    points: [
      "Hit 95–100% accuracy across six automated QA checks by turning audit guidelines into deterministic rules and LLM validators.",
      "Grew automated audit coverage from ~5% to up to 100% of eligible cases through small, well-tested increments.",
      "Built an agentic LLM system combining RAG with structured tool execution for enterprise data and transcript analysis.",
    ],
    tags: ["LLMs", "RAG", "Agents", "Python"],
  },
  {
    org: "AlgoUniversity (YC S21)",
    role: "Software Engineering Co-op Intern",
    period: "May – Jul 2025",
    summary: "CodeArena: an online judge with real-time, multi-language execution.",
    points: [
      "Built an online judge handling parallel submissions with real-time multi-language code execution.",
      "Shipped dashboards, rankings, DSA scheduling, resume analysis and internship recommendations with the Gemini API.",
      "Containerised and deployed on AWS EC2 with Next.js, Express, PostgreSQL, Prisma and Docker.",
    ],
    tags: ["Next.js", "Express", "PostgreSQL", "Docker", "AWS"],
  },
  {
    org: "Internloom",
    role: "Web Developer Intern",
    period: "Nov 2024 – May 2025",
    summary: "Owned a full-stack product from database to UI.",
    points: [
      "Delivered the frontend, backend, database and auth layers end to end.",
      "Migrated React → Next.js and PostgreSQL → MySQL with incremental releases.",
      "Implemented NextAuth, Zustand state and responsive Tailwind interfaces.",
    ],
    tags: ["Next.js", "MySQL", "NextAuth", "Zustand"],
  },
];

export const achievements = [
  "AlgoUniversity Tech Fellow: top 0.35% of 20,000+ applicants",
  "LeetCode rating 1998, top 3% globally · 700+ problems solved",
  "Codeforces Specialist (vander_wal)",
  "Won Forfeit'23 · 2nd at IEEE CodeSprint'23 & MITBLR GC'23",
  "Top 15 at HackNite AWS Hackathon · GSSoC contributor",
];

// Repos listed here are pinned to the top of "Work" (if they exist on GitHub).
// Everything else is pulled automatically and sorted by most recent activity.
export const featuredRepos = ["Custo", "ReachAI", "NeuraAdapt-AI"];

// Repos to never show (profile README repos, coursework, etc.). Case-insensitive.
export const hiddenRepos = ["AmanSingh-tech", "MyWebsite"];

// Fallback blurbs for repos that have no description on GitHub (the GitHub description wins if set).
export const repoBlurbs: Record<string, string> = {
  custo: "Policy-constrained AI support triage: classifies conversations, ranks permitted actions and routes uncertain cases to humans.",
  reachai: "Local-first agentic outreach: job discovery, ranking, company research and grounded LLM drafts with human approval.",
  "neuraadapt-ai": "Real-time confusion detection from eye movement, surfacing the right video clips and transcripts for revision.",
};
