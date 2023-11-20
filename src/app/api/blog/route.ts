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

// 全記事取得
export const GET = async (req: Request, res: NextResponse) => {
  // const { id } = req.params;
  // const blog = await Blog.findById(id);
  // return res.json(blog);
  console.log('GET');

  try {
    await main();
    const post = await prisma.post.findMany();

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

// 全記事取得
export const POST = async (req: Request, res: NextResponse) => {
  // const { id } = req.params;
  // const blog = await Blog.findById(id);
  // return res.json(blog);
  console.log('GET');

  try {
    await main();

    const { title, description } = await req.json();
    const post = await prisma.post.create({
      data: {
        title: title,
        description: description,
      }
    });

    return NextResponse.json({
      message: 'success',
      post,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
