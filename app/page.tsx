import Link from "next/link";
import Button from "./ui/button";
import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <div className={styles.borderCard}>
      <div className={styles.cardTitle}>簡便的記帳小工具</div>
      <Link href="/records">
        <Button type="button" style="long" color="pink">
          <div className="text-2xl text-white p-2">開始使用</div>
        </Button>
      </Link>
    </div>
  );
}
