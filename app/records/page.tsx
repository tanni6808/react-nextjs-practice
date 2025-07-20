"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddRecord from "../components/records/add-record";
import RecordList from "../components/records/record-list";
import Button from "../components/button";
import Link from "next/link";
import { RecordItem } from "../lib/definitions";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Login auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/");
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Record change
  useEffect(() => {
    if (!user) return;
    const recordsQuery = query(
      collection(db, "users", user.uid, "records"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(recordsQuery, (querySnapshot) => {
      const fetchedRecords: RecordItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as RecordItem[];
      setRecords(fetchedRecords);
    });
    return () => unsubscribe();
  }, [user]);

  // Add record
  const handleAddRecord = async (data: Omit<RecordItem, "id">) => {
    if (!user) return;
    const ref = collection(db, "users", user.uid, "records");
    await addDoc(ref, { ...data, createdAt: Timestamp.now() });
  };

  // Del record
  const handleDelRecord = async (recordId: string) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "records", recordId);
    await deleteDoc(ref);
  };

  if (isLoading) {
    return <div className="text-gray-500">確認登入狀態...</div>;
  }
  return (
    <>
      <AddRecord onAdd={handleAddRecord} />
      <RecordList records={records} onDelete={handleDelRecord} />
      <Link href="/member">
        <Button type="button" style="long" color="pink">
          <div className="p-2 text-white">回到會員中心</div>
        </Button>
      </Link>
    </>
  );
}
