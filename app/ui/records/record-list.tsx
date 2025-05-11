import { RecordItem } from "@/app/lib/definitions";
import DeleteBtn from "./delete-btn";
import styles from "../ui.module.css";
import { auth, db } from "../../lib/firebase";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function RecordList() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser;
  const handleDelRecord = async (recordId: string) => {
    if (!user || !recordId) {
      alert("ID不存在!");
      return;
    }
    try {
      const recordRef = doc(db, "users", user.uid, "records", recordId);
      await deleteDoc(recordRef);
    } catch (err) {
      alert(`無法刪除資料(${err})，請稍後再試。`);
    }
  };
  useEffect(() => {
    if (!user) {
      setRecords([]);
      setIsLoading(false);
      return;
    }
    const recordsQuery = query(
      collection(db, "users", user.uid, "records"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      recordsQuery,
      (querySnapshot) => {
        const recordsData: RecordItem[] = [];
        querySnapshot.forEach((doc) => {
          const record = {
            id: doc.id,
            type: doc.data().type,
            amount: doc.data().amount,
            note: doc.data().note,
          } as RecordItem;
          recordsData.push(record);
        });
        setRecords(recordsData);
        setIsLoading(false);
      },
      (err) => {
        setIsLoading(false);
        alert(`無法取得資料(${err})，請稍後再試。`);
        throw err;
      }
    );
    return () => unsubscribe();
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
              onClick={() => handleDelRecord(item.id)}
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
