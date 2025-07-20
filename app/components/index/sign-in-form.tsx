// import styles from "../ui.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "../form";
import Input from "../input";
import Button from "../button";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignInForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState<string>("test1@mail.com");
  const [pw, setPw] = useState<string>("123456");
  const notify = () => toast.error("電子郵件地址或密碼輸入錯誤!");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      onSuccess();
    } catch (err: any) {
      notify();
    }
  };
  return (
    <Form id="signin" onSubmit={handleSubmit}>
      <Input
        type="email"
        id="signin-email"
        placeholder="電子郵件地址"
        value={email}
        onChange={setEmail}
      ></Input>
      <Input
        type="password"
        id="signin-password"
        placeholder="密碼"
        value={pw}
        onChange={setPw}
      ></Input>
      <Button type="submit" style="long" color="pink">
        <div className="text-xl text-white p-1">登入</div>
      </Button>
      <ToastContainer position="top-center" autoClose={3000} />
    </Form>
  );
}
