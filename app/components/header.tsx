import styles from "@/app/components/ui.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <div className="text-2xl text-white">Accounting</div>
      </Link>
    </header>
  );
}
