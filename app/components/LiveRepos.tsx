"use client";

import { useEffect, useState } from "react";
import type { Repo } from "@/lib/github";
import { site } from "@/lib/site";
import RepoCard from "./RepoCard";

// Shown only when the page was built without projects: loads them in the browser instead.
export default function LiveRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    fetch("/api/repos")
      .then((r) => (r.ok ? r.json() : []))
      .then(setRepos)
      .catch(() => setRepos([]));
  }, []);

  if (repos === null) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading projects">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-[32px] bg-card/60" />
        ))}
      </div>
    );
  }

  if (!repos.length) {
    return (
      <p className="rounded-[32px] bg-card/60 p-8 text-lg text-ink-soft">
        My projects are taking a nap. Catch them on{" "}
        <a className="font-bold text-ink underline decoration-sugar decoration-2 underline-offset-4" href={site.links.github}>
          GitHub
        </a>{" "}
        in the meantime.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r, i) => (
        <RepoCard key={r.name} repo={r} index={i} />
      ))}
    </div>
  );
}
