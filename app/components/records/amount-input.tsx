import styles from "../ui.module.css";

export default function AmountInput({
  type,
  value,
  onChange,
}: {
  type: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      className={`${styles.amountInput} ${
        type === "expense" ? styles.pinkInput : styles.greenInput
      }`}
      type="number"
      min={1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder="金額"
      required
    />
  );
}
