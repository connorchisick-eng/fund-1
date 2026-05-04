export const BENCHMARK_BLEND = [
  { ticker: "SPY", weight: 60, name: "S&P 500" },
  { ticker: "AGG", weight: 14, name: "US Aggregate Bond" },
  { ticker: "SHY", weight: 14, name: "1–3Y Treasury" },
  { ticker: "GLD", weight: 8, name: "Gold" },
  { ticker: "DBC", weight: 4, name: "Diversified Commodities" },
] as const;

export function BenchmarkComposition({
  variant = "row",
}: {
  variant?: "row" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[var(--color-muted)]">
        <span className="rule-label">Benchmark</span>
        {BENCHMARK_BLEND.map((b, i) => (
          <span key={b.ticker} className="tabular-nums">
            <span className="text-[var(--color-ink)] font-medium">{b.weight}%</span>{" "}
            {b.ticker}
            {i < BENCHMARK_BLEND.length - 1 && <span className="ml-3 text-[var(--color-rule)]">·</span>}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="border hairline bg-[var(--color-paper)]">
      <div className="px-4 md:px-5 py-3 border-b hairline flex items-center justify-between bg-[var(--color-bone)]">
        <div className="rule-label">Blended Benchmark</div>
        <div className="font-mono text-[10px] uppercase text-[var(--color-muted)]">
          60 / 14 / 14 / 8 / 4
        </div>
      </div>
      <div className="grid grid-cols-5">
        {BENCHMARK_BLEND.map((b) => (
          <div
            key={b.ticker}
            className="px-3 md:px-4 py-3 border-r hairline last:border-r-0 text-center"
          >
            <div className="font-num text-xl md:text-2xl text-[var(--color-cardinal)]">
              {b.weight}%
            </div>
            <div className="mt-0.5 font-num text-xs font-medium">{b.ticker}</div>
            <div className="mt-0.5 font-mono text-[9px] uppercase text-[var(--color-muted)] leading-tight">
              {b.name}
            </div>
          </div>
        ))}
      </div>
      {/* Stacked weight bar */}
      <div className="h-[4px] flex">
        {BENCHMARK_BLEND.map((b, i) => {
          const colors = [
            "var(--color-cardinal)",
            "var(--color-ink)",
            "#b58a00",
            "var(--color-gold)",
            "#d4cfb8",
          ];
          return (
            <div
              key={b.ticker}
              style={{ width: `${b.weight}%`, background: colors[i] }}
              aria-label={`${b.ticker} ${b.weight}%`}
            />
          );
        })}
      </div>
    </div>
  );
}
