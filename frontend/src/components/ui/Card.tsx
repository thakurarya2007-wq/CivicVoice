import type { ReactNode } from "react";
import { colors } from "../../theme/colors";

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div
      style={{
        background: colors.surface,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        border: `1px solid ${colors.border}`,
      }}
    >
      {children}
    </div>
  );
}