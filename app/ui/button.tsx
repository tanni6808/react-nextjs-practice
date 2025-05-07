import styles from "./ui.module.css";

export default function Button({
  children,
  type,
  color,
  onClick,
}: {
  children: React.ReactNode;
  type: "long" | "short";
  color: "pink" | "green";
  onClick?: () => void;
}) {
  return (
    <button
      className={`${styles.button} ${
        type === "long" ? styles.longButton : styles.shortButton
      } ${color === "pink" ? styles.pinkButton : styles.greenButton}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
