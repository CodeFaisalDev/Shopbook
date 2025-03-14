"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Next.js Link component
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { TicketPercent, ListMinus, Settings } from "lucide-react";
// import { auth, User, currentUser } from "@clerk/nextjs/server";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import getUser from "@/utils/userServices";

const Navbar = () => {
  // const { userId, sessionId } = await auth();
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        emailAddresses: user.emailAddresses.map((email) => email.emailAddress),
        primaryEmailAddress: user.primaryEmailAddress?.emailAddress || null,
        phoneNumbers: user.phoneNumbers.map((phone) => phone.phoneNumber),
        primaryPhoneNumber: user.primaryPhoneNumber || null,
        imageUrl: user.imageUrl,
      };

      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => console.log("User data sent successfully:", data))
        .catch((err) => console.error("Error sending user data:", err));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetch(`/api/auth?id=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUserData(data.user);
          } else {
            console.error("Error fetching user data:", data.error);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return null;

  // getUser()

  return (
    <div className="flex justify-between my-4">
      {/* User and activity button */}
      <div className="flex justify-center items-center gap-3">
        <div>
          <Avatar>
            <AvatarImage
              src={userData?.imageUrl}
              className="rounded-full bg-secondary p-1"
            />
          </Avatar>
          {/* <UserButton
            userProfileMode="navigation"
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "w-11 h-11 border-4 border-secondary shadow-xl",
                userButtonPopoverCard: "bg-gray-800",
              },
            }}
          /> */}
        </div>
        <div>
          <Link href={`/${user.id}/myactivity`}>
            <Button className="bg-primary rounded-full font-raleway font-normal">
              My Activity
            </Button>
          </Link>
        </div>
      </div>

      {/* Voucher Menu and Settings Button */}
      <div className="flex justify-center items-center gap-3 font-normal">
        <Link href={`/${user.id}/vouchers`}>
          <TicketPercent
            strokeWidth={1.2}
            className="cursor-pointer text-primary size-9 p-1.5 rounded-full bg-secondary"
          />
        </Link>
        <Link href={`/${user.id}/menu`}>
          <ListMinus
            strokeWidth={1.2}
            className="cursor-pointer text-primary size-9 p-1.5 rounded-full bg-secondary"
          />
        </Link>
        <Link href={`/${user.id}/settings`}>
          <Settings
            strokeWidth={1.2}
            className="cursor-pointer text-primary size-9 p-1.5 rounded-full bg-secondary"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
