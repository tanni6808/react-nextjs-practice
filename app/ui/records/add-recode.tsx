"use client";
import { useState } from "react";
import Select from "../select";
import AmountInput from "../amount-input";
import NoteInput from "../note-input";
import Button from "../button";
import styles from "../ui.module.css";

export default function AddRecord() {
  const [type, setType] = useState<"expense" | "income">("expense");
  return (
    <div className={styles.addRecord}>
      <Select type={type} onChangeType={setType} />
      <AmountInput type={type} />
      <NoteInput type={type} />
      <Button
        text="新增"
        type="short"
        color={type === "expense" ? "pink" : "green"}
      />
    </div>
  );
}
