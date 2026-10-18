import type { Repo } from "@/lib/github";
import { Arrow } from "./RollLink";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#e9c53a",
  Python: "#3572a5",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "Jupyter Notebook": "#da5b0b",
  Shell: "#89e051",
  Cuda: "#3a4e3a",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function prettyName(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const updated = new Date(repo.pushedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return (
    <article className="group relative flex h-full flex-col rounded-[32px] bg-card/60 p-7 transition-all duration-500 ease-pop hover:-translate-y-1 hover:-rotate-1 hover:bg-card">
      <div className="flex items-start justify-between">
        <span className="font-display text-4xl text-sugar">{pad(index + 1)}</span>
        {repo.featured && <span className="chip border-sugar bg-sugar-soft text-ink">Featured</span>}
      </div>
      <h3 className="mt-4 font-display text-2xl text-ink">
        <a href={repo.url} target="_blank" rel="noreferrer" data-cursor="Code" className="after:absolute after:inset-0 after:rounded-[32px]">
          {prettyName(repo.name)}
        </a>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-ink-soft">{repo.description ?? "A little something I built. Peek at the code!"}</p>
      {repo.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((t) => (
            <span key={t} className="chip px-2.5 py-0.5">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="mt-5 flex items-center gap-4 text-sm text-ink-soft">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? "#a39c89" }} aria-hidden="true" />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && <span>★ {repo.stars}</span>}
        <span className="ml-auto">{updated}</span>
      </div>
      {repo.homepage && (
        <a
          href={repo.homepage}
          target="_blank"
          rel="noreferrer"
          data-cursor="Live"
          className="relative z-10 mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-1.5 font-display text-sm text-paper hover:bg-sugar hover:text-cocoa"
        >
          Live demo <Arrow className="h-3 w-3" />
        </a>
      )}
    </article>
  );
}
