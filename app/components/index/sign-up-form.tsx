import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "../form";
import Input from "../input";
import Button from "../button";
import { auth } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export default function SignUpForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const showErrorToast = (error: any) => toast.error(error);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pw
      );
      await signOut(auth);
      alert("註冊成功！請使用電子郵件地址及密碼登入。");
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, { displayName: name });
      } else throw new Error("Failed to get user after creation");
    } catch (err: any) {
      let errorMessage = "註冊失敗，請稍後再試。";
      if (err && err.message) {
        switch (err.code) {
          case "auth/email-already-in-use":
            errorMessage = "電子郵件已被使用。";
            break;
          case "auth/weak-password":
            errorMessage = "請輸入6個字元(含)以上的密碼";
            break;
          case "auth/invalid-email":
            errorMessage = "電子郵件格式錯誤。";
            break;
          default:
            errorMessage = `註冊失敗：${err.message}。請稍後再試`;
        }
      }
      showErrorToast(errorMessage);
    }
  };
  return (
    <Form id="signup" onSubmit={handleSubmit}>
      <Input
        type="text"
        id="signup-name"
        placeholder="使用者名稱"
        value={name}
        onChange={setName}
      ></Input>
      <Input
        type="email"
        id="signup-email"
        placeholder="電子郵件地址"
        value={email}
        onChange={setEmail}
      ></Input>
      <Input
        type="password"
        id="signup-password"
        placeholder="密碼(至少6個字元)"
        value={pw}
        onChange={setPw}
      ></Input>
      <Button type="submit" style="long" color="pink">
        <div className="text-xl text-white p-1">註冊</div>
      </Button>
      <ToastContainer position="top-center" autoClose={3000} />
    </Form>
  );
}
