import { RecordItem } from "@/app/lib/definitions";
// import styles from "../ui.module.css";

export default function RecordList({ records }: { records: RecordItem[] }) {
  return (
    <ul className="my-10">
      {records.map((item) => (
        <li key={item.id}>
          {item.type === "expense" ? "－" : "＋"}
          {item.amount} ．{item.note}
        </li>
      ))}
    </ul>
  );
}
