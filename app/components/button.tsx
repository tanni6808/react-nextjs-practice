import styles from "./ui.module.css";

export default function Button({
  children,
  type,
  style,
  color,
  onClick,
}: {
  children: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  style: "long" | "short";
  color: "pink" | "green";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${
        style === "long" ? styles.longButton : styles.shortButton
      } ${color === "pink" ? styles.pinkButton : styles.greenButton}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
