"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const carouselData = [
  {
    src: "/HelloSectionImage/1.png",
    header: "Hello!",
    text: "Welcome to ShopBook! Discover amazing deals, shop effortlessly, and enjoy a seamless shopping experience anytime, anywhere.",
  },
  {
    src: "/HelloSectionImage/2.png",
    header: "Ready?",
    text: "Ready to shop? Explore the best deals, find your favorites, and enjoy a seamless shopping experience with ShopBook!",
  },
];

export default function HelloCard() {
  const router = useRouter();
  const [currIndex, setCurrIndex] = useState(0);


  const carouselSpring = useSpring({
    from: { opacity: 0, transform: "scale(1.1)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 200, friction: 12 },
  });


  return (
    <div className="flex w-screen h-screen justify-center items-center p-5 bg-[url('/HelloSectionImage/HelloImage.png')] bg-cover bg-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {carouselData.map((item, idx) => (
              <CarouselItem
                key={idx}
                onClick={() => setCurrIndex(idx)}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-5">
                  <Card className="rounded-3xl bg-opacity-0 shadow-md border-none">
                    <CardContent className="flex flex-col p-1 items-center justify-center rounded-3xl">
                      <div className="flex flex-col">
                        <Image
                          src={item.src}
                          alt={`Slide ${idx + 1}`}
                          width={300}
                          height={300}
                          className="object-cover rounded-3xl"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center p-5 text-wrap text-center gap-5 text-gray-700">
                        <h1 className="text-3xl font-bold">{item.header}</h1>
                        <p className="text-center font-medium text-lg">
                          {item.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {idx === carouselData.length - 1 && (
                  <div  className="flex p-5 justify-center items-center">
                    <Button onClick={() => router.push("/home")}>
                      Get Started
                    </Button>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
    </div>
  );
}
