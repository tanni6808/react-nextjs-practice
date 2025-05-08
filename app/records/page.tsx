"use client";
import { useState } from "react";
import { RecordItem } from "../lib/definitions";
import AddRecord from "../ui/records/add-recode";
import RecordList from "../ui/records/record-list";
import Summary from "../ui/records/sum";
import Button from "../ui/button";
import Link from "next/link";

export default function Page() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const handleAddRecord = (record: RecordItem) => {
    setRecords((prev) => [record, ...prev]);
  };
  const handleDelRecord = (id: string) => {
    setRecords((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <AddRecord onAddRecord={handleAddRecord} />
      <RecordList records={records} onDelete={handleDelRecord} />
      <Summary records={records}></Summary>
      <Link href="/">
        <Button type="button" style="short" color="pink">
          <div className="p-2 text-white">回首頁</div>
        </Button>
      </Link>
    </>
  );
}
