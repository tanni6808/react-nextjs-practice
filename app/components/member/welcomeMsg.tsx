import styles from "../../page.module.css";

export default function WelcomeMsg({ userName }: { userName: string | null }) {
  return (
    userName && (
      <div className={`${styles.cardTitle} text-2xl`}>
        歡迎回來，{userName}！
      </div>
    )
  );
}
