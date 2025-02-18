import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  console.log('Received a POST request at /api/auth/register');
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await fetch(`htps://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { first_name, last_name, email_address, image_url } = user;

    const newUser = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        firstName: first_name || "",
        lastName: last_name || "",
        emailAddresses: email_address.map((e) => e.email),
        primaryEmailAddress:
          email_address.find((e) => e.primary)?.email || email_address[0].email,
        imageUrl: image_url || "",
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
