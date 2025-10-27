"use client";

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLikeCount, useIncressLikeCount } from "@/apiHooks/likeBtnApi";

interface LikeButtonProps {
  slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const { mutate: incressLikeCount } = useIncressLikeCount({ slug });
  const { data: likeCountData, isLoading } = useGetLikeCount({ slug });

  // Refs to hold the debounce timer and pending click count
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const pendingClicks = useRef(0);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const sendBatchedLikes = async () => {
    const clicksToSend = pendingClicks.current;
    if (clicksToSend === 0) return;

    pendingClicks.current = 0;

    try {
      incressLikeCount({ count: clicksToSend });
    } catch (error) {
      console.error("Failed to update likes:", error);
      setLikeCount((prevCount) => prevCount - clicksToSend);
    }
  };

  const handleLike = () => {
    setLikeCount((prevCount) => prevCount + 1);
    pendingClicks.current += 1;

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      sendBatchedLikes();
    }, 2000);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLike}
      disabled={isLoading}
      className="flex min-w-[70px] items-center gap-2 px-3"
      aria-label="Like post"
    >
      <Heart
        className={`size-4 transition-all duration-300 ${
          isClicked ? "fill-red-500 text-red-500 scale-125" : "text-current"
        }`}
      />
      <span className="text-sm font-medium">
        {isLoading ? "..." : likeCountData.count + likeCount}
      </span>
    </Button>
  );
}
