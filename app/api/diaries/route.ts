import { NextResponse } from "next/server";

type Diary = {
  id: number;
  content: string;
  mood: "开心" | "平静" | "难过" | "兴奋";
  date: string;
};

const diaries: Diary[] = [
  {
    id: 1,
    content: "今天第一次用 Next.js 写 App Router，小有成就感！",
    mood: "开心",
    date: "2025-01-01",
  },
  {
    id: 2,
    content: "工作有点忙，不过慢慢来，保持节奏。",
    mood: "平静",
    date: "2025-01-02",
  },
  {
    id: 3,
    content: "遇到一个难 Bug，卡了很久，有点沮丧。",
    mood: "难过",
    date: "2025-01-03",
  },
  {
    id: 4,
    content: "终于把 Bug 解决了！准备学习更多 Next.js 知识。",
    mood: "兴奋",
    date: "2025-01-04",
  },
];

export async function GET() {
  return NextResponse.json(diaries);
}

