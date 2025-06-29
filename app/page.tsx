"use client";
// import Link from "next/link";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SignInForm from "./ui/home/sign-in-form";
import SignUpForm from "./ui/home/sign-up-form";
import { auth } from "./lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const handleSignInSuccess = () => {
    router.push("/member");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        router.push("/member");
        // setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  });

  if (isLoading) {
    return <div className="text-gray-500">載入中...</div>;
  }
  return (
    <div>
      <div className={`${styles.cardTitle} text-2xl`}>簡便的記帳小工具</div>
      <div className={styles.borderCard}>
        <div className="text-[#fcb3b7]">歡迎使用測試帳號：</div>
        <div className="text-[#fcb3b7]">test1@mail.com/123456</div>
        <SignInForm onSuccess={handleSignInSuccess} />
        <div className={styles.cardDivider}>或</div>
        <SignUpForm />
      </div>
    </div>
  );
}
