import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const diaries = await prisma.diary.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(diaries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "获取日记失败" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, mood, date } = body as {
      content?: string;
      mood?: string;
      date?: string;
    };

    if (!content || !mood) {
      return NextResponse.json(
        { message: "content 和 mood 必填" },
        { status: 400 },
      );
    }

    const diary = await prisma.diary.create({
      data: {
        content: content.trim(),
        mood,
        date: date ?? new Date().toISOString().slice(0, 10),
      },
    });

    return NextResponse.json(diary, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "新增日记失败" }, { status: 500 });
  }
}

