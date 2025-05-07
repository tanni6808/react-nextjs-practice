import styles from "./ui.module.css";

export default function NoteInput({ type }: { type: string }) {
  return (
    <input
      className={`${styles.noteInput} ${
        type === "expense" ? styles.pinkInput : styles.greenInput
      }`}
      type="text"
      name=""
      id=""
      maxLength={20}
      placeholder="備註"
      required
    />
  );
}
