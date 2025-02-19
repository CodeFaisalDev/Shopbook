import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LikeCommentShare from "./LikeCommentShare/LikeCommentShare";

const SingleStories = ({ src }) => {
  return (
    <div>
      <div className="absolute top-2 left-2 flex justify-center items-center gap-2 bg-primary/70 p-2 rounded-3xl">
        <span className="border bg-secondary rounded-full p-1  shadow-xl">
          <Avatar className="size-8">
            <AvatarImage src={src} />
            <AvatarFallback>cn</AvatarFallback>
          </Avatar>
        </span>
        <span className="text-secondary font-semibold text-md">User Name</span>
      </div>
      <div className="w-screen h-screen">
        <Image
          src={src}
          alt="stories"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 bg-primary/70 w-screen h-32 rounded-t-3xl px-2 py-5 flex flex-col justify-between">
        <div>
          <h1 className="text-secondary/80 font-extralight ">Description:</h1>
          <p className="text-secondary font-extralight truncate">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            repellendus error doloribus sit ipsa numquam cum atque quam
            perspiciatis in? Tempora facilis ea cupiditate? Quasi?
          </p>
        </div>
        <span className="flex justify-center items-center w-fit text-secondary/80 gap-3">
          <CalendarDays />
          jan-10-2025
        </span>
      </div>
      <div className="absolute bottom-1/3 right-0">
           <LikeCommentShare /> 
      </div>
    </div>
  );
};

export default SingleStories;
