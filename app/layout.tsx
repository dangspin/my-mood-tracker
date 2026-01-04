import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "心情日记板",
  description: "用 Next.js 14 打造的简单心情日记板示例",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="zh-CN">
        <body className="bg-slate-100 min-h-screen">
          <header className="bg-white shadow-sm">
            <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold text-slate-800">
                心情日记板 Mood Tracker
              </h1>
              {/* 这里以后可以放 UserButton / SignInButton */}
            </div>
          </header>

          <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}

