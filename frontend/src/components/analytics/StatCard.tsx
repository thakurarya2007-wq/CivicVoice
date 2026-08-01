import type { ReactNode } from "react";

type Props = {
  title: string;
  value: number | string;
  subtitle: string;
  icon: ReactNode;
  color: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl text-white"
          style={{
            background: color,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}