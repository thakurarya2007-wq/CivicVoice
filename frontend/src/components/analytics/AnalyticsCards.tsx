type Props = {
    total: number;
    visible: number;
    critical: number;
    clusters: number;
};

type CardProps = {
    title: string;
    value: number;
    color: string;
    icon: string;
};

function StatCard({
    title,
    value,
    color,
    icon,
}: CardProps) {
    return (
        <div
            style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "12px",
                borderLeft: `6px solid ${color}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
        >
            <div
                style={{
                    fontSize: "14px",
                    color: "#666",
                    marginBottom: "8px",
                }}
            >
                {icon} {title}
            </div>

            <div
                style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color,
                }}
            >
                {value}
            </div>
        </div>
    );
}

export default function AnalyticsCards({
    total,
    visible,
    critical,
    clusters,
}: Props) {
    return (
        <>
            <StatCard
                title="Total Complaints"
                value={total}
                color="#2563eb"
                icon="📊"
            />

            <StatCard
                title="Visible Complaints"
                value={visible}
                color="#16a34a"
                icon="👁️"
            />

            <StatCard
                title="Critical Complaints"
                value={critical}
                color="#dc2626"
                icon="🚨"
            />

            <StatCard
                title="Active Clusters"
                value={clusters}
                color="#9333ea"
                icon="📍"
            />
        </>
    );
}