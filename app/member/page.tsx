"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../page.module.css";
import Button from "../components/button";
import WelcomeMsg from "../components/member/welcomeMsg";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      alert(`登出失敗：${err.message}，請稍後再試一次。`);
    }
  };

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
    auth.currentUser && (
      <div>
        <div className={styles.borderCard}>
          <div className="my-4">
            <WelcomeMsg userName={auth.currentUser.displayName} />
            <div className="flex gap-4 justify-center">
              <Link href={"/records"}>
                <Button type="button" style="short" color="pink">
                  <div className="p-2 text-white text-base">開始使用</div>
                </Button>
              </Link>
              <Button
                type="button"
                style="short"
                color="green"
                onClick={handleSignOut}
              >
                <div className="p-2 text-white text-base">登出</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
