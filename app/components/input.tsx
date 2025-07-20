import styles from "./ui.module.css";

export default function Input({
  type,
  id,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.fieldHolder}>
      <input
        type={type}
        name={id}
        id={id}
        required
        placeholder=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
}
