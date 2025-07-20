import type { Metadata } from "next";
import styles from "./page.module.css";
import Header from "./components/header";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Accounting",
  description: "A simple accounting app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} antialiased`}>
        <Header />
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
