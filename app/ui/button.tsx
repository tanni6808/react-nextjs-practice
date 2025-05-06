import styles from "./ui.module.css";

export default function Button({ text }: { text: string }) {
  return (
    <button className={styles.button}>
      <div className="text-2xl text-white p-2">{text}</div>
    </button>
  );
}
