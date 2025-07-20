import { RecordItem } from "@/app/lib/definitions";
import DeleteBtn from "./delete-btn";
import styles from "../ui.module.css";
import { auth } from "../../lib/firebase";
import { useState, useEffect } from "react";

export default function RecordList({
  records,
  onDelete,
}: {
  records: RecordItem[];
  onDelete: (recordId: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser;
  useEffect(() => {
    if (user) {
      setIsLoading(false);
      return;
    }
  }, [user?.uid]);

  if (isLoading) {
    return <div className="text-gray-500">載入記帳紀錄...</div>;
  }

  return (
    <div className="">
      <ul className="my-10 max-h-80 overflow-y-scroll">
        {records.map((item) => (
          <li
            className={`${styles.recordList} ${
              item.type === "expense"
                ? styles.pinkRecordList
                : styles.greenRecordList
            }`}
            key={item.id}
          >
            <div className={styles.recordListAmount}>
              {item.type === "expense" ? "－" : "＋"}
              {item.amount}
            </div>
            <div className={styles.recordListNote}>{item.note}</div>
            <DeleteBtn
              color={item.type === "expense" ? "pink" : "green"}
              onClick={() => onDelete(item.id)}
            />
          </li>
        ))}
      </ul>
      <div className="text-gray-500 mb-5 text-center">
        合計：
        {records.reduce(function (acc, curr) {
          if (curr.type === "expense") return acc - curr.amount;
          else return acc + curr.amount;
        }, 0)}
        元
      </div>
    </div>
  );
}
