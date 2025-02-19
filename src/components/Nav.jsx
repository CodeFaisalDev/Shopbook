"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { TicketPercent, ListMinus, Settings } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store/useUserStore";
import { getUser, postUser } from "@/utils/userServices";
import { Skeleton } from "./ui/skeleton"; // Import the Skeleton component

const Nav = () => {
  const { user } = useUser();
  const { userData, loading, setUserData } = useUserStore();

  useEffect(() => {
    if (user && !userData) {
      const userPayload = {
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

      // Send user data (only once)
      postUser(userPayload).then(() => {
        // Retrieve user data after posting
        getUser(user.id).then((data) => {
          if (data.success) {
            setUserData(data.user);
          } else {
            console.error("Error fetching user data:", data.error);
          }
        });
      });
    }
  }, [user, userData, setUserData]);

  if (!user) return null;

  return (
    <div className="flex justify-between my-4">
      {loading ? (
        // Skeleton Loader
        <div className="flex justify-between w-full">
          <div className="flex justify-center items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full bg-secondary" />
            <Skeleton className="w-32 h-10 rounded-full bg-secondary" />
          </div>
          <div className="flex justify-center items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full bg-secondary" />
            <Skeleton className="w-10 h-10 rounded-full bg-secondary" />
            <Skeleton className="w-10 h-10 rounded-full bg-secondary" />
          </div>
        </div>
      ) : (
        // Actual Navbar
        <>
          <div className="flex justify-center items-center gap-3">
            <Avatar>
              <AvatarImage
                src={userData?.imageUrl}
                className="rounded-full bg-secondary p-1"
              />
            </Avatar>
            <Link href={`/${user.id}/myactivity`}>
              <Button className="bg-primary rounded-full font-raleway font-normal">
                My Activity
              </Button>
            </Link>
          </div>

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
        </>
      )}
    </div>
  );
};

export default Nav;
