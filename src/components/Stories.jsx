import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SingleStories from "./SingleStories";


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

const Stories = () => {
  return (
    <div className="my-3">
        <h1 className="text-2xl font-bold pb-3">Stories:</h1>
      <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="basis-1/3">
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="relative w-fill h-44 rounded-xl">
                    <span className="absolute top-2 left-2 border rounded-full p-1 bg-secondary shadow-xl">
                      <Avatar className="size-8">
                        <AvatarImage src={img.src} />
                        <AvatarFallback>cn</AvatarFallback>
                      </Avatar>
                    </span>
                    <CardContent className="w-full h-full p-0 rounded-xl">
                      <Image
                        src={img.src}
                        alt="stories"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="w-screen h-screen border-none p-0">
                  <SingleStories src={img.src}/>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Stories;
