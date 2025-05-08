"use client";
import { useState } from "react";
import { RecordItem } from "@/app/lib/definitions";
import Select from "./select";
import AmountInput from "./amount-input";
import NoteInput from "./note-input";
import Button from "../button";
import styles from "../ui.module.css";

export default function AddRecord({
  onAddRecord,
}: {
  onAddRecord: (record: RecordItem) => void;
}) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const handleAddRecord = () => {
    if (!amount) return alert("請輸入金額!");
    if (note === "") return alert("請輸入備註!");
    onAddRecord({
      id: Date.now().toString(),
      type,
      amount,
      note,
    });
    setAmount(0);
    setNote("");
  };
  return (
    <form
      className={styles.addRecord}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddRecord();
      }}
    >
      <Select type={type} onChangeType={setType} />
      <AmountInput type={type} value={amount} onChange={setAmount} />
      <NoteInput type={type} value={note} onChange={setNote} />
      <Button
        type="submit"
        style="short"
        color={type === "expense" ? "pink" : "green"}
      >
        <div className="text-base text-white p-2">新增</div>
      </Button>
    </form>
  );
}
