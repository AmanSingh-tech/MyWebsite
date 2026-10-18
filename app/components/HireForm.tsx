"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { Arrow } from "./RollLink";

const reasons = ["Full-time role", "Internship", "Freelance project", "Collab / hackathon", "Just saying hi"];

type Status = { kind: "idle" | "sending" | "sent" } | { kind: "error"; message: string; fallback?: string };

export default function HireForm() {
  const [reason, setReason] = useState(reasons[0]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus({ kind: "sending" });

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`${reason} from ${data.name}`)}&body=${encodeURIComponent(
      `${data.message}\n\n— ${data.name}${data.company ? `, ${data.company}` : ""}\n${data.email}`,
    )}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, reason }),
      });
      if (res.ok) {
        setStatus({ kind: "sent" });
        form.reset();
        return;
      }
      const { error } = await res.json().catch(() => ({ error: "" }));
      if (res.status === 400) setStatus({ kind: "error", message: error });
      else setStatus({ kind: "error", message: "The form couldn't send just now.", fallback: mailto });
    } catch {
      setStatus({ kind: "error", message: "The form couldn't send just now.", fallback: mailto });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center rounded-[36px] bg-white/70 p-8 sm:p-12" role="status">
        <p className="font-display text-5xl text-ink">Thanks! 🤝</p>
        <p className="mt-4 max-w-md text-lg text-ink-soft">
          Your message landed in my inbox. I usually reply within a day or two.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 font-display text-ink underline decoration-sugar decoration-4 underline-offset-8 hover:text-sugar"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[36px] bg-white/60 p-6 sm:p-10">
      <fieldset>
        <legend className="eyebrow mb-3">What brings you here?</legend>
        <div className="flex flex-wrap gap-2">
          {reasons.map((r) => (
            <label
              key={r}
              className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-bold transition-all duration-300 ease-pop has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sugar ${
                reason === r ? "-rotate-2 border-ink bg-ink text-paper" : "border-ink/15 text-ink-soft hover:border-ink/40"
              }`}
            >
              <input type="radio" name="reason-choice" value={r} checked={reason === r} onChange={() => setReason(r)} className="sr-only" />
              {r}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-1.5 block">Your name</span>
          <input name="name" required maxLength={100} autoComplete="name" className="field" placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="eyebrow mb-1.5 block">Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className="field" placeholder="jane@company.com" />
        </label>
        <label className="block">
          <span className="eyebrow mb-1.5 block">
            Company <span className="text-ink-faint">(optional)</span>
          </span>
          <input name="company" maxLength={120} autoComplete="organization" className="field" placeholder="Where you work" />
        </label>
        <label className="block">
          <span className="eyebrow mb-1.5 block">
            Timeline / budget <span className="text-ink-faint">(optional)</span>
          </span>
          <input name="budget" maxLength={60} className="field" placeholder="e.g. Summer 2027, 3 months" />
        </label>
        <label className="block sm:col-span-2">
          <span className="eyebrow mb-1.5 block">Message</span>
          <textarea
            name="message"
            required
            maxLength={5000}
            rows={5}
            className="field resize-y"
            placeholder="Tell me a bit about the role or project…"
          />
        </label>
        {/* honeypot for bots */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          data-cursor="Send!"
          className="group inline-flex items-center gap-3 rounded-full bg-sugar px-7 py-4 font-display text-xl text-ink transition-transform duration-300 ease-pop hover:-rotate-2 hover:scale-[1.03] disabled:opacity-60"
        >
          <span className="roll">
            <span>{status.kind === "sending" ? "Sending…" : "Say “Hey!”"}</span>
            <span aria-hidden="true">{status.kind === "sending" ? "Sending…" : "Say “Hey!”"}</span>
          </span>
          <Arrow className="h-5 w-5 transition-transform duration-500 ease-pop group-hover:rotate-45" />
        </button>
        <p className="text-sm text-ink-soft">
          or email{" "}
          <a href={`mailto:${site.email}`} className="font-bold text-ink underline decoration-sugar decoration-2 underline-offset-4">
            {site.email}
          </a>
        </p>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="mt-5 rounded-2xl bg-sugar-soft px-4 py-3 text-sm text-ink">
          {status.message}{" "}
          {status.fallback && (
            <a href={status.fallback} className="font-bold underline underline-offset-4">
              Send it from your email app instead →
            </a>
          )}
        </p>
      )}
    </form>
  );
}
