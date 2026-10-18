import type { ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <path d="M9 31 31 9M13 9h18v18" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Big friendly link: text rolls up on hover, arrow nudges toward its target.
export default function RollLink({
  href,
  children,
  external,
  cursor,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  cursor?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      data-cursor={cursor}
      className={`group inline-flex items-center gap-3 font-display text-ink ${className}`}
    >
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <Arrow className="h-[0.8em] w-[0.8em] text-sugar transition-transform duration-500 ease-pop group-hover:rotate-45" />
    </a>
  );
}
