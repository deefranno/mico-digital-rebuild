import type { Statistic } from "@/types";
import { useCountUp } from "@/hooks/use-count-up";

interface StatisticCardProps {
  statistic: Statistic;
}

/** "Mico by the numbers" stat — gold count-up figure on a black section. */
export function StatisticCard({ statistic }: StatisticCardProps) {
  const { ref, value } = useCountUp(statistic.value);

  return (
    <div className="border-l-2 border-mico-gold pl-5">
      <p className="font-display text-3xl font-extrabold tracking-tight text-mico-gold sm:text-4xl">
        <span ref={ref}>{value.toLocaleString("en-US")}</span>
        {statistic.suffix && <span aria-hidden="true">{statistic.suffix}</span>}
        {statistic.prefix && <span aria-hidden="true">{statistic.prefix}</span>}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{statistic.label}</p>
      {statistic.note && (
        <p className="mt-1 text-xs text-white/45">({statistic.note})</p>
      )}
    </div>
  );
}
