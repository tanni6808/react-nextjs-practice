import styles from "../ui.module.css";

export default function NoteInput({
  type,
  value,
  onChange,
}: {
  type: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      className={`${styles.noteInput} ${
        type === "expense" ? styles.pinkInput : styles.greenInput
      }`}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={20}
      placeholder="備註(最多20字)"
      required
    />
  );
}
