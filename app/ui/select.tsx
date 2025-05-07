"use client";
import styles from "./ui.module.css";
import clsx from "clsx";

export default function Select({
  type,
  onChangeType,
}: {
  type: "expense" | "income";
  onChangeType: (value: "expense" | "income") => void;
}) {
  return (
    <div
      className={clsx(styles.recTypeSelect, {
        [styles.pinkSelect]: type === "expense",
        [styles.greenSelect]: type === "income",
      })}
    >
      <select
        value={type}
        onChange={(e) => onChangeType(e.target.value as "expense" | "income")}
      >
        <option className="text-black" value="expense">
          支出（－）
        </option>
        <option className="text-black" value="income">
          收入（＋）
        </option>
      </select>
    </div>
  );
}
