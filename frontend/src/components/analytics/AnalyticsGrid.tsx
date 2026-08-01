import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  MapPinned,
} from "lucide-react";

import StatCard from "./StatCard";

type Props = {
  total: number;
  critical: number;
  clusters: number;
  resolved: number;
};

export default function AnalyticsGrid({
  total,
  critical,
  clusters,
  resolved,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Complaints"
        value={total}
        subtitle="All registered complaints"
        icon={<FileText size={28} />}
        color="#2563EB"
      />

      <StatCard
        title="Critical"
        value={critical}
        subtitle="Need immediate attention"
        icon={<AlertTriangle size={28} />}
        color="#DC2626"
      />

      <StatCard
        title="Clusters"
        value={clusters}
        subtitle="Active issue clusters"
        icon={<MapPinned size={28} />}
        color="#F59E0B"
      />

      <StatCard
        title="Resolved"
        value={resolved}
        subtitle="Successfully completed"
        icon={<CheckCircle2 size={28} />}
        color="#22C55E"
      />

    </div>
  );
}