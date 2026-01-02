"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

export type Diary = {
  id: number;
  content: string;
  mood: string;
  date: string;
};

type DiaryCardProps = {
  diary: Diary;
};

export default function DiaryCard({ diary }: DiaryCardProps) {
  const [likedCount, setLikedCount] = useState<number>(0); // useState：定义一个状态来记录点赞数，初始值为 0

  const handleLike = () => {
    setLikedCount((prev) => prev + 1); // 使用 setLikedCount 更新状态，让点赞数加 1

    confetti({
    particleCount: 60,
    spread: 45,
    origin: { x: 0.5, y: 0.6 },
  });
  };

  return (
    <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-slate-500">{diary.date}</span>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
          {diary.mood}
        </span>
      </div>

      <p className="mb-3 leading-relaxed text-slate-800">{diary.content}</p>

      <button
        type="button"
        onClick={handleLike} // 点击按钮时触发 handleLike，更新点赞数
        className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm text-rose-600 transition-colors hover:bg-rose-100"
      >
        <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
        <span>点赞</span>
        <span className="text-xs text-rose-500">({likedCount})</span>
      </button>
    </div>
  );
}

