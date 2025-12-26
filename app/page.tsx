"use client";

import { useEffect, useState } from "react";
import DiaryCard, { Diary } from "@/components/DiaryCard";

export default function HomePage() {
  const [diaries, setDiaries] = useState<Diary[]>([]); // useState：创建一个状态来保存从 API 获取到的日记列表

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
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        今天的心情记录
      </h2>

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

