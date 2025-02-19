import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(){
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
                stories: true,
                reels: true,
                followers: true,
                following: true,
                wishlist: true,
                cart: true,
                orders: true,
                reviews: true,
                comments: true,
                likes: true,
              },
        })

        console.log("Fetched Users:", users);
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        console.error("Error fetching users", error)
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }
}