import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const data = await req.json();

    let user = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data,
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data,
      });
    }
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
