import type { InputHTMLAttributes } from "react";
import { colors } from "../../theme/colors";

export default function Input(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "14px",
        borderRadius: "12px",
        border: `1px solid ${colors.border}`,
        outline: "none",
        fontSize: "15px",
        boxSizing: "border-box",
      }}
    />
  );
}