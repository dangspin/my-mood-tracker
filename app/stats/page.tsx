"use client";

import { useEffect, useState } from "react";
import type { Diary } from "@/components/DiaryCard";

export default function StatsPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

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

  const happyCount = diaries.filter((diary) => diary.mood === "开心").length;

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        心情数据统计
      </h2>

      <p className="text-slate-700">
        当前“开心”日记数量：{" "}
        <span className="font-semibold text-emerald-600">{happyCount}</span> 条
      </p>

      {diaries.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">
          暂时没有日记数据，请确认 API 是否正常工作。
        </p>
      )}
    </div>
  );
}

