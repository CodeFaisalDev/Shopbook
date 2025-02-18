import React from "react";
import Link from "next/link"; // Import Next.js Link component
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

import { TicketPercent, ListMinus, Settings } from "lucide-react";
import { auth, clerkClient } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId, sessionId } = await auth();

  const client = await clerkClient()
  const token = await client.sessions.getToken(sessionId)
  
  // console.log(token);
  

  return (
    <div className="flex justify-between my-4">
      {/* User and activity button */}
      <div className="flex justify-center items-center gap-3">
        <div>
            <UserButton
              userProfileMode="navigation"
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "w-11 h-11 border-4 border-secondary shadow-xl",
                  userButtonPopoverCard: "bg-gray-800",
                },
              }}
            />
        </div>
        <div>
          <Link href={`/${userId}/myactivity`}>
            <Button className="bg-primary rounded-full font-raleway font-normal">
              My Activity
            </Button>
          </Link>
        </div>
      </div>

      {/* Voucher Menu and Settings Button */}
      <div className="flex justify-center items-center gap-3 font-normal">
        <Link href={`/${userId}/vouchers`}>
          <TicketPercent
            strokeWidth={1.2}
            className="cursor-pointer text-primary size-9 p-1.5 rounded-full bg-secondary"
          />
        </Link>
        <Link href={`/${userId}/menu`}>
          <ListMinus
            strokeWidth={1.2}
            className="cursor-pointer text-primary size-9 p-1.5 rounded-full bg-secondary"
          />
        </Link>
        <Link href={`/${userId}/settings`}>
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
