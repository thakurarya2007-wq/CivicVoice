import { colors } from "../../theme/colors";

type Props = {
  text: string;
  color?: string;
};

export default function Badge({
  text,
  color = colors.primary,
}: Props) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "999px",
        background: color,
        color: "#fff",
        fontSize: "13px",
        fontWeight: 600,
      }}
    >
      {text}
    </span>
  );
}