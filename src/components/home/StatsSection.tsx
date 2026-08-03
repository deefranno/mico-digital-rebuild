import { StatisticCard } from "@/components/cards/StatisticCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getStatistics } from "@/lib/content/content";
import { useAsyncData } from "@/lib/content/use-async";

/** "Mico by the numbers" — black band, gold accents, count-up values. */
export function StatsSection() {
  const state = useAsyncData(getStatistics);
  const stats = state.data ?? [];

  return (
    <section className="bg-black py-16 text-white sm:py-24" aria-labelledby="stats-heading">
      <div className="container-site">
        <SectionHeading
          id="stats-heading"
          eyebrow="Mico by the numbers"
          title="A century and a half of impact"
          tone="light"
          description="Every figure below is placeholder content — official statistics will be supplied by the institution."
        />
        <dl className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatisticCard key={stat.id} statistic={stat} />
          ))}
        </dl>
        <p className="mt-12 border-t border-white/10 pt-6 text-xs text-white/45">
          Placeholder figures for demonstration only — not official institutional
          statistics.
        </p>
      </div>
    </section>
  );
}
