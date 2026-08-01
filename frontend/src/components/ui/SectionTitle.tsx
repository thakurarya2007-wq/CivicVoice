import type { ReactNode } from "react";
import { colors } from "../../theme/colors";

type Props = {
  children: ReactNode;
};

export default function SectionTitle({
  children,
}: Props) {
  return (
    <h2
      style={{
        color: colors.text,
        marginBottom: "16px",
        fontWeight: 700,
      }}
    >
      {children}
    </h2>
  );
}