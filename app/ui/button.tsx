import styles from "./ui.module.css";

export default function Button({
  text,
  type,
  color,
}: {
  text: string;
  type: "long" | "short";
  color: "pink" | "green";
}) {
  return (
    <button
      className={`${styles.button} ${
        type === "long" ? styles.longButton : styles.shortButton
      } ${color === "pink" ? styles.pinkButton : styles.greenButton}`}
    >
      <div
        className={`${
          type === "long" ? "text-2xl" : "text-base"
        } text-white p-2`}
      >
        {text}
      </div>
    </button>
  );
}
