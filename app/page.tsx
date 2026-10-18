import { achievements, cases, site } from "@/lib/site";
import { getRepos } from "@/lib/github";
import { getCodingStats } from "@/lib/stats";
import Room from "./components/Room";
import Reveal from "./components/Reveal";
import RollLink, { Arrow } from "./components/RollLink";
import HireForm from "./components/HireForm";
import RepoCard from "./components/RepoCard";
import LiveRepos from "./components/LiveRepos";

export const revalidate = 86400; // 24h, keep in sync with REVALIDATE_SECONDS

const pad = (n: number) => String(n).padStart(2, "0");

function SectionTitle({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return (
    <Reveal className="mb-10 flex items-end justify-between gap-6 border-b-2 border-ink/10 pb-5 sm:mb-14">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2 className="mt-1 font-display text-5xl text-ink sm:text-7xl">{title}</h2>
      </div>
      <span className="font-display text-5xl text-sugar sm:text-7xl" aria-hidden="true">
        {index}
      </span>
    </Reveal>
  );
}

export default async function Home() {
  const [repos, stats] = await Promise.all([getRepos(9), getCodingStats()]);

  return (
    <main id="home">
      {/* ── Hero: the room + a side note, like a letter ───────────────────── */}
      <section className="wrap grid min-h-[100svh] items-center gap-10 pb-16 pt-52 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-48">
        <Room />

        <div className="flex flex-col">
          <p className="font-display text-4xl text-ink sm:text-5xl">Hey!</p>
          <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
            I&rsquo;m {site.name.split(" ")[0]},
            <br />a software engineer
            <br />
            who likes building <span className="text-sugar">calm,</span>
            <br />
            <span className="text-sugar">reliable</span> things.
          </p>
          <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">
            {site.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <RollLink href="#cases" cursor="Go!" className="text-3xl sm:text-4xl">
              Get to know me
            </RollLink>
            <a href="#hire" className="chip border-sugar bg-sugar-soft text-ink hover:bg-sugar">
              ● Open to opportunities
            </a>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section id="about" className="wrap scroll-mt-10 py-20 sm:py-28">
        <SectionTitle index="✦" kicker="A little about me" title="About" />
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="font-display text-3xl leading-snug text-ink sm:text-4xl">
              CS @ Manipal, Bengaluru. Ex-intern at <span className="text-sugar">Google</span> &{" "}
              <span className="text-sugar">AlgoUniversity</span>. I think in data structures and ship in small, well-tested
              steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {site.skills.map((s) => (
                <span key={s} className="chip bg-white/60">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-4">Highlights</p>
            <ul className="space-y-4">
              {achievements.map((a, i) => (
                <li key={a} className="flex gap-4 border-b border-dashed border-ink/15 pb-4 text-lg text-ink">
                  <span className="font-display text-sugar">{pad(i + 1)}</span>
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-2xl">
              <RollLink href={site.links.resume} external cursor="Read">
                Résumé
              </RollLink>
              <RollLink href={site.links.linkedin} external cursor="Connect">
                LinkedIn
              </RollLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Cases: experience, one card per role ─────────────────────────── */}
      <section id="cases" className="wrap scroll-mt-10 py-20 sm:py-28">
        <SectionTitle index={pad(cases.length)} kicker="Where I've worked" title="Cases" />
        <div className="space-y-5">
          {cases.map((c, i) => (
            <Reveal key={c.org} delay={i * 80}>
              <details className="group/case rounded-[32px] bg-white/60 transition-colors duration-300 open:bg-white hover:bg-white" open={i === 0}>
                <summary
                  data-cursor="Open"
                  className="flex cursor-pointer list-none items-center gap-5 p-6 sm:gap-8 sm:p-8 [&::-webkit-details-marker]:hidden"
                >
                  <span className="font-display text-sm text-ink-soft">
                    Case
                    <span className="block text-5xl text-sugar sm:text-6xl">{pad(i + 1)}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-2xl text-ink sm:text-4xl">{c.org}</span>
                    <span className="mt-1 block text-sm font-semibold text-ink-soft sm:text-base">
                      {c.role} · {c.period}
                    </span>
                  </span>
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-2xl text-paper transition-transform duration-500 ease-pop group-open/case:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="grid gap-6 px-6 pb-8 sm:px-8 md:grid-cols-[1fr_2fr] md:pl-[calc(2rem+5.5rem)]">
                  <p className="font-display text-xl leading-snug text-ink">{c.summary}</p>
                  <div>
                    <ul className="space-y-3 text-ink-soft">
                      {c.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sugar" aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Work: pulled live from GitHub ────────────────────────────────── */}
      <section id="work" className="wrap scroll-mt-10 py-20 sm:py-28">
        <SectionTitle index={repos.length ? pad(repos.length) : "↻"} kicker="Fresh from GitHub" title="Work" />
        {repos.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 90}>
                <RepoCard repo={r} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <LiveRepos />
        )}
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-ink-soft">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-sugar align-middle" aria-hidden="true" />
            Synced automatically from github.com/{site.handles.github}, refreshed daily.
          </p>
          <RollLink href={site.links.github} external cursor="GitHub" className="text-2xl">
            See everything
          </RollLink>
        </Reveal>
      </section>

      {/* ── Numbers: competitive programming ─────────────────────────────── */}
      <section id="numbers" className="wrap scroll-mt-10 py-20 sm:py-28">
        <SectionTitle index="#" kicker="Contest life" title="Numbers" />
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <StatCard
              href={site.links.leetcode}
              label="LeetCode contest rating"
              value={stats.leetcode?.rating ? String(stats.leetcode.rating) : "1998"}
              note={
                stats.leetcode?.topPercent != null
                  ? `Top ${stats.leetcode.topPercent.toFixed(2)}% globally`
                  : "Top 3% globally"
              }
            />
          </Reveal>
          <Reveal delay={90}>
            <StatCard
              href={site.links.codeforces}
              label="Codeforces · vander_wal"
              value={stats.codeforces ? String(stats.codeforces.rating) : "1452"}
              note={stats.codeforces ? `${stats.codeforces.rank[0].toUpperCase()}${stats.codeforces.rank.slice(1)} · max ${stats.codeforces.maxRating}` : "Specialist"}
              accent
            />
          </Reveal>
          <Reveal delay={180}>
            <StatCard
              href={site.links.leetcodeAlt}
              label="Problems solved"
              value="700+"
              note={stats.leetcode ? `${stats.leetcode.solved} on LeetCode · ${stats.leetcode.hard} hard` : "Across LeetCode & Codeforces"}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Hire me ──────────────────────────────────────────────────────── */}
      <section id="hire" className="scroll-mt-10 bg-paper-deep py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">Hire me · Collaborate · Say hi</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] text-ink sm:text-7xl">
              Don&rsquo;t be shy.
              <br />
              Feel free
              <br />
              to say <span className="text-sugar">&ldquo;Hey!&rdquo;</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg text-ink-soft">
              Looking for internships and new-grad software roles (2027), and open to interesting freelance and
              open-source work.
            </p>
            <ul className="mt-8 space-y-2 font-display text-xl">
              {[
                ["LinkedIn", site.links.linkedin],
                ["GitHub", site.links.github],
                ["Codeforces", site.links.codeforces],
                ["LeetCode", site.links.leetcode],
              ].map(([label, href]) => (
                <li key={label}>
                  <RollLink href={href} external>
                    {label}
                  </RollLink>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <HireForm />
          </Reveal>
        </div>
      </section>

      <footer className="wrap flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-display whitespace-nowrap text-[clamp(3rem,11vw,8rem)] leading-none text-ink">{site.short}</p>
        <div className="text-sm text-ink-soft sm:text-right">
          <p>{site.location}</p>
          <p>© {new Date().getFullYear()} {site.name}. Made with Next.js & sugar.</p>
          <a href="#home" className="mt-2 inline-block font-display text-ink hover:text-sugar">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  );
}

function StatCard({ href, label, value, note, accent }: { href: string; label: string; value: string; note: string; accent?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-cursor="Profile"
      className={`group flex h-full flex-col justify-between rounded-[32px] p-8 transition-transform duration-500 ease-pop hover:-rotate-1 ${
        accent ? "bg-sugar" : "bg-white/60 hover:bg-white"
      }`}
    >
      <p className="eyebrow text-ink">{label}</p>
      <p className="my-6 font-display text-7xl text-ink sm:text-8xl">{value}</p>
      <p className="flex items-center justify-between text-sm font-semibold text-ink">
        {note}
        <Arrow className="h-4 w-4 transition-transform duration-500 ease-pop group-hover:rotate-45" />
      </p>
    </a>
  );
}
