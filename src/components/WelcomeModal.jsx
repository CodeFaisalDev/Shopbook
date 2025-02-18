"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useTransition, animated } from "@react-spring/web"; // Use useTransition for mounting/unmounting

const WelcomeModal = () => {
  const { user } = useUser();
  const firstName = user?.firstName;

  const [isOpen, setIsOpen] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (firstName) {
      setIsLoaded(true);
    }
  }, [firstName]);

  // Transition to handle mounting/unmounting with animation
  const transitions = useTransition(isOpen, {
    from: { transform: "translateY(0)", opacity: 1 }, // Initial state when it is open (fully visible)
    enter: { transform: "translateY(0)", opacity: 1 }, // Keep the modal in place when entering
    leave: { transform: "translateY(100%)", opacity: 0 }, // Slide down and fade out when closing
    config: { tension: 200, friction: 20 },
    reverse: isOpen, // Ensures reverse animation when closing
  });

  return (
    <>
      {transitions(
        (style, item) =>
          item && (

            <animated.div style={style} className="flex flex-col justify-center items-center">
              <div>
                <div className="flex justify-between items-center">


                  <h1 className="text-2xl font-bold">
                    {/* Skeleton will show until data is loaded */}
                    {!isLoaded ? (
                      <Skeleton className="w-[80vw] h-8" />
                    ) : (
                      // Fade-in content after data is loaded
                      <span className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        Hello, {firstName}!
                      </span>
                    )}
                  </h1>


                  <Button onClick={closeModal} variant="ghost" className="pr-0 pl-2">
                    <X />
                  </Button>


                </div>


                <div className="bg-secondary p-2 rounded-xl">


                  <h2 className="font-semibold">
                    {!isLoaded ? <Skeleton className="w-32 h-6" /> : "Announcement"}
                  </h2>


                  <div className="text-sm font-light">
                    {!isLoaded ? (
                      <Skeleton className="w-64 h-4" />
                    ) : (
                      <p>&quot;Big Savings Alert! Shop now &amp; enjoy exclusive deals on your favorite products! 🛍️&quot;</p>
                    )}
                  </div>


                </div>
              </div>
            </animated.div>

            
          )
      )}
    </>
  );
};

export default WelcomeModal;
