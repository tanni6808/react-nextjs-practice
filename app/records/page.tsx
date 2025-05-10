"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RecordItem } from "../lib/definitions";
import AddRecord from "../ui/records/add-recode";
import RecordList from "../ui/records/record-list";
import Summary from "../ui/records/sum";
import Button from "../ui/button";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Page() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const handleAddRecord = (record: RecordItem) => {
    setRecords((prev) => [record, ...prev]);
  };
  const handleDelRecord = (id: string) => {
    setRecords((prev) => prev.filter((item) => item.id !== id));
  };
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setIsLoading(false);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div className="text-gray-500">確認登入狀態...</div>;
  }
  return (
    <>
      <AddRecord onAddRecord={handleAddRecord} />
      <RecordList records={records} onDelete={handleDelRecord} />
      <Summary records={records}></Summary>
      <Link href="/member">
        <Button type="button" style="long" color="pink">
          <div className="p-2 text-white">回到會員中心</div>
        </Button>
      </Link>
    </>
  );
}
