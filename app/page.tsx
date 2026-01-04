"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import DiaryCard, { Diary } from "@/components/DiaryCard";

export default function HomePage() {
  const [diaries, setDiaries] = useState<Diary[]>([]); // useState：创建一个状态来保存从 API 获取到的日记列表
  const [newContent, setNewContent] = useState("");
  const [newMood, setNewMood] = useState("开心");

  const handleAddDiary = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!newContent.trim()) return;

  const today = new Date().toISOString().slice(0, 10);

  try {
    const res = await fetch("/api/diaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newContent.trim(),
        mood: newMood,
        date: today,
      }),
    });

    if (!res.ok) {
      console.error("创建日记失败", await res.text());
      return;
    }

    const created: Diary = await res.json();

    setDiaries((prev) => [created, ...prev]);
    setNewContent("");
    setNewMood("开心");
  } catch (error) {
    console.error("请求 /api/diaries 失败", error);
  }
};

    useEffect(() => {
    const loadDiaries = async () => {
      try {
        const stored = window.localStorage.getItem("mood-diaries");
        if (stored) {
          const parsed: Diary[] = JSON.parse(stored);
          setDiaries(parsed);
          return;
        }

        const res = await fetch("/api/diaries");
        if (!res.ok) {
          throw new Error("获取日记失败");
        }
        const data: Diary[] = await res.json();
        setDiaries(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadDiaries();
  }, []);

  useEffect(() => {
    if (diaries.length === 0) return;
    window.localStorage.setItem("mood-diaries", JSON.stringify(diaries));
  }, [diaries]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">今天的心情记录</h2>

        <Link
          href="/stats"
          className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100"
        >
          查看统计
        </Link>
      </div>

      <form
      onSubmit={handleAddDiary}
      className="mb-6 space-y-3 rounded-xl bg-white p-4 shadow-sm"
    >
      <textarea
        value={newContent}
        onChange={(event) => setNewContent(event.target.value)}
        placeholder="写下你今天的心情..."
        className="w-full resize-none rounded-lg border border-slate-200 p-2 text-sm text-slate-800 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100"
        rows={3}
      />

      <div className="flex items-center justify-between">
        <select
          value={newMood}
          onChange={(event) => setNewMood(event.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-700 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100"
        >
          <option value="开心">开心</option>
          <option value="平静">平静</option>
          <option value="难过">难过</option>
          <option value="兴奋">兴奋</option>
        </select>

        <button
          type="submit"
          className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-600"
        >
          添加日记
        </button>
      </div>
    </form>

      <div>
        {diaries.map((diary) => (
          // map：遍历 diaries 数组，把每一项渲染成一个 DiaryCard 组件
          <DiaryCard key={diary.id} diary={diary} />
        ))}
      </div>

      {diaries.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          暂时没有日记数据，请确认 API 是否正常工作。
        </p>
      )}
    </div>
  );
}

