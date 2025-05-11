"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "./select";
import AmountInput from "./amount-input";
import NoteInput from "./note-input";
import Button from "../button";
import styles from "../ui.module.css";
import { auth, db } from "../../lib/firebase";
import { User } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AddRecord() {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const handleAddRecord = async () => {
    if (!amount) return toast.error("請輸入金額!");
    const user: User | null = auth.currentUser;

    if (user) {
      const uid = user.uid;
      try {
        const recordsCollectionRef = collection(db, "users", uid, "records");
        await addDoc(recordsCollectionRef, {
          type: type,
          amount: amount,
          note: note,
          createdAt: Timestamp.now(),
        });
      } catch (err: any) {
        toast.error(`添加記帳紀錄時發生錯誤(${err})，請稍後再試。`);
      }
    }
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
      <ToastContainer position="top-center" autoClose={2000} />
    </form>
  );
}
