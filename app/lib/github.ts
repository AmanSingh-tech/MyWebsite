import { featuredRepos, hiddenRepos, repoBlurbs, site } from "./site";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string;
  featured: boolean;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
};

// Re-fetched at most once a day (ISR), so new repos and pushes
// show up on the live site without a redeploy.
export const REVALIDATE_SECONDS = 60 * 60 * 24;

export async function getRepos(limit = 9): Promise<Repo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: without a token GitHub allows 60 req/hour per IP, which shared
  // build machines can exhaust. A read-only fine-grained token avoids that.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${site.handles.github}/repos?per_page=100&sort=pushed&type=owner`,
      { headers, next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const data = (await res.json()) as ApiRepo[];

    const hidden = new Set(hiddenRepos.map((n) => n.toLowerCase()));
    const featured = featuredRepos.map((n) => n.toLowerCase());

    const repos = data
      .filter((r) => !r.fork && !r.archived && !r.private && !hidden.has(r.name.toLowerCase()))
      .map<Repo>((r) => ({
        name: r.name,
        description: r.description || repoBlurbs[r.name.toLowerCase()] || null,
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        pushedAt: r.pushed_at,
        featured: featured.includes(r.name.toLowerCase()),
      }));

    repos.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.featured && b.featured)
        return featured.indexOf(a.name.toLowerCase()) - featured.indexOf(b.name.toLowerCase());
      return Date.parse(b.pushedAt) - Date.parse(a.pushedAt);
    });

    return repos.slice(0, limit);
  } catch (err) {
    console.error("Failed to load GitHub repos:", err);
    // At build time, render the fallback rather than failing the deploy. During a
    // background refresh, throw so Next keeps serving the last good page and retries,
    // instead of caching an empty Work section for a whole day.
    if (process.env.NEXT_PHASE === "phase-production-build") return [];
    throw err;
  }
}

export function prettyName(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
