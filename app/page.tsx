"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import DiaryCard, { Diary } from "@/components/DiaryCard";

export default function HomePage() {
  const [diaries, setDiaries] = useState<Diary[]>([]); // useState：创建一个状态来保存从 API 获取到的日记列表
  const [newContent, setNewContent] = useState("");
  const [newMood, setNewMood] = useState("开心");

  const handleAddDiary = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newContent.trim()) return;

    const nextId =
      diaries.length > 0 ? Math.max(...diaries.map((diary) => diary.id)) + 1 : 1;
    const today = new Date().toISOString().slice(0, 10);

    const newDiary: Diary = {
      id: nextId,
      content: newContent.trim(),
      mood: newMood,
      date: today,
    };

    setDiaries((prev) => [newDiary, ...prev]);
    setNewContent("");
    setNewMood("开心");
  };

  useEffect(() => {
    // useEffect：在组件挂载后执行副作用逻辑，比如请求数据
    const fetchDiaries = async () => {
      try {
        const res = await fetch("/api/diaries"); // fetch：向我们的 API 路由 /api/diaries 发送 GET 请求
        if (!res.ok) {
          throw new Error("获取日记失败");
        }
        const data: Diary[] = await res.json(); // 把响应体解析成 JavaScript 对象
        setDiaries(data); // 使用 setDiaries 更新组件状态
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiaries(); // 调用上面定义的异步函数
  }, []); // 依赖数组 []：表示这个 useEffect 只在组件首次渲染后执行一次

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

