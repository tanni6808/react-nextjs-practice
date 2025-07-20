"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddRecord from "../components/records/add-record";
import RecordList from "../components/records/record-list";
import Button from "../components/button";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setIsLoading(false);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  });

  if (isLoading) {
    return <div className="text-gray-500">確認登入狀態...</div>;
  }
  return (
    <>
      <AddRecord />
      <RecordList />
      <Link href="/member">
        <Button type="button" style="long" color="pink">
          <div className="p-2 text-white">回到會員中心</div>
        </Button>
      </Link>
    </>
  );
}
