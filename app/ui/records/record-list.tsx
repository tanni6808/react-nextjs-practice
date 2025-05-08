import { RecordItem } from "@/app/lib/definitions";
import DeleteBtn from "./delete-btn";
import styles from "../ui.module.css";

export default function RecordList({
  records,
  onDelete,
}: {
  records: RecordItem[];
  onDelete: (id: string) => void;
}) {
  return (
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
  );
}
