import styles from "./ui.module.css";

export default function AmountInput({ type }: { type: string }) {
  return (
    <input
      className={`${styles.amountInput} ${
        type === "expense" ? styles.pinkInput : styles.greenInput
      }`}
      type="number"
      name=""
      id=""
      min={0}
      placeholder="金額"
      required
    />
  );
}
