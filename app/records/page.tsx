"use client";
import { useState } from "react";
import { RecordItem } from "../lib/definitions";
import AddRecord from "../ui/records/add-recode";
import RecordList from "../ui/records/record-list";

export default function Page() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const handleAddRecord = (record: RecordItem) => {
    setRecords((prev) => [...prev, record]);
  };
  return (
    <>
      <AddRecord onAddRecord={handleAddRecord} />
      <RecordList records={records} />
    </>
  );
}
