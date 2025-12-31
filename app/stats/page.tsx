"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Diary } from "@/components/DiaryCard";

const moods = ["开心", "平静", "难过", "兴奋"] as const;
type MoodFilter = "全部" | (typeof moods)[number];

export default function StatsPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodFilter>("开心");

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
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

    fetchDiaries();
  }, []);

  const filteredDiaries =
  selectedMood === "全部"
    ? diaries
    : diaries.filter((diary) => diary.mood === selectedMood);
  const totalCount = filteredDiaries.length;

  return (
    <div>
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-slate-800">
        心情数据统计
      </h2>

      <Link
        href="/"
        className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100"
      >
        返回首页
      </Link>
    </div>

    <div className="mb-4 flex items-center justify-between">
      <div className="text-sm text-slate-600">选择要统计的心情：</div>
      <select
        value={selectedMood}
        onChange={(event) =>
          setSelectedMood(event.target.value as MoodFilter)
        }
        className="rounded-lg border border-slate-200 px-3 py-1 text-xs text-slate-700 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100"
      >
        <option value="全部">全部</option>
        {moods.map((mood) => (
          <option key={mood} value={mood}>
            {mood}
          </option>
        ))}
      </select>
    </div>

    <p className="text-slate-700">
      当前「
      {selectedMood === "全部" ? "所有心情" : selectedMood}
      」日记数量：{" "}
      <span className="font-semibold text-emerald-600">{totalCount}</span> 条
    </p>

      {diaries.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          暂时没有日记数据，请确认 API 是否正常工作。
        </p>
      )}
    </div>
  );
}

