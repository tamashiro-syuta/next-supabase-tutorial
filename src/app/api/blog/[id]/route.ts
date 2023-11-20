import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    throw error;
  }
}

// 詳細取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();

    const id = parseInt(req.url.split('/blog/')[1])
    const post = await prisma.post.findFirst({ where: { id: id } });

    return NextResponse.json({
      message: 'success',
      post,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// 更新
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    await main();

    const id = parseInt(req.url.split('/blog/')[1])
    const { title, description } = await req.json();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id: id }
    });

    return NextResponse.json({
      message: 'success',
      post,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// 削除
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    await main();

    const id = parseInt(req.url.split('/blog/')[1])
    const post = await prisma.post.delete({
      where: { id: id }
    });

    return NextResponse.json({
      message: 'success',
      post,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
