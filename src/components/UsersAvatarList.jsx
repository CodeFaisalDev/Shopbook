import React from "react";
import getAllUser from "@/utils/getAllUser";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

const images = [
  { src: "/test/1.jpg" },
  { src: "/test/2.jpg" },
  { src: "/test/3.jpg" },
  { src: "/test/4.jpg" },
  { src: "/test/5.jpg" },
  { src: "/test/6.jpg" },
  { src: "/test/7.jpg" },
  { src: "/test/8.jpg" },
];

const UsersAvatarList = async () => {
  const users = await getAllUser();

  // console.log("Users: ",users);

  return (
    <div className="my-3">
      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="basis-1/5">
              <div className="w-16 h-16 rounded-full p-2 bg-secondary">
                <Avatar >
                  <AvatarImage
                    src={img.src || "/default-avatar.png"}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default UsersAvatarList;
