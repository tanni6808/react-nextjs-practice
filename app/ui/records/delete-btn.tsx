import styles from "../ui.module.css";

export default function DeleteBtn({
  color,
  onClick,
}: {
  color: "pink" | "green";
  onClick?: () => void;
}) {
  return (
    <button
      className={`${styles.delBtn} ${
        color === "pink" ? styles.pinkDelBtn : styles.greenDelBtn
      }`}
      onClick={onClick}
    >
      刪除
    </button>
  );
}
