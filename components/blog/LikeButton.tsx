"use client";

import { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  // Refs to hold the debounce timer and pending click count
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const pendingClicks = useRef(0);

  useEffect(() => {
    const fetchLikes = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/likes?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setLikeCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch likes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [slug]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Function to send the batched update to the server
  const sendBatchedLikes = async () => {
    const clicksToSend = pendingClicks.current;
    if (clicksToSend === 0) return;

    pendingClicks.current = 0;

    try {
      await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          action: "increment",
          count: clicksToSend,
        }),
      });
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
        {isLoading ? "..." : likeCount}
      </span>
    </Button>
  );
}
