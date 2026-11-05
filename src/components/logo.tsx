import { Link } from "@tanstack/react-router";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.2 26.2V14.2L10.2 5.4l5.8 8.6 5.8-8.6 5 8.8v12H22.4V17.1L16 23.2 9.6 17.1v9.1H5.2z"
      />
    </svg>
  );
}

export function Logo({ tone = "ink" }: { tone?: "ink" | "foam" }) {
  const color = tone === "foam" ? "text-foam" : "text-ink";
  return (
    <Link to="/" className={`flex items-center gap-2 ${color}`} aria-label="MM Moda Fitness, início">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal text-paper">
        <Mark className="h-6 w-6" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-bold tracking-tight">Moda</span>
        <span className="-mt-0.5 block font-sans text-xs font-medium tracking-widest text-teal uppercase">
          Fitness
        </span>
      </span>
    </Link>
  );
}
