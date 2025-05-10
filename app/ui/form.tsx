import styles from "./ui.module.css";

export default function Form({
  id,
  onSubmit,
  children,
}: {
  id: string;
  onSubmit?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <form className={styles.form} id={id} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
