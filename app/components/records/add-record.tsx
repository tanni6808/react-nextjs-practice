"use client";
import { useState } from "react";
import { RecordItem } from "@/app/lib/definitions";
import Select from "./select";
import AmountInput from "./amount-input";
import NoteInput from "./note-input";
import Button from "../button";
import styles from "../ui.module.css";

export default function AddRecord({
  onAdd,
}: {
  onAdd: (data: Omit<RecordItem, "id">) => void;
}) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  return (
    <form
      className={styles.addRecord}
      onSubmit={(e) => {
        e.preventDefault();
        onAdd({ type: type, amount: amount, note: note });
        setAmount(0);
        setNote("");
      }}
    >
      <div className="flex max-sm:flex-col items-center gap-2">
        <div className="flex">
          <Select type={type} onChangeType={setType} />
          <AmountInput type={type} value={amount} onChange={setAmount} />
          <NoteInput type={type} value={note} onChange={setNote} />
        </div>
        <div className="sm:hidden">
          <Button
            type="submit"
            style="long"
            color={type === "expense" ? "pink" : "green"}
          >
            <div className="text-base text-white p-2">新增</div>
          </Button>
        </div>
        <div className="max-sm:hidden">
          <Button
            type="submit"
            style="short"
            color={type === "expense" ? "pink" : "green"}
          >
            <div className="text-base text-white p-2">新增</div>
          </Button>
        </div>
      </div>
    </form>
  );
}
