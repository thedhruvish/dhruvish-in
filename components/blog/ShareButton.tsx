"use client";

import { useState } from "react";
import { Share, Copy, Facebook, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import X from "../svgs/X";
import LinkedIn from "../svgs/LinkedIn";
import Whatsapp from "../svgs/Whatsapp";

interface ShareButtonProps {
  title: string;
  slug: string;
}

export function ShareButton({ title, slug }: ShareButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  // Ensure this environment variable is set in .env.local
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/blog/${slug}`;

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const shareLinks = [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      icon: <X className="size-5" />,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
      icon: <LinkedIn className="size-5" />,
    },

    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      icon: <Facebook className="size-5" />,
    },
    {
      name: "Whatsapp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      icon: <Whatsapp />,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Share post">
          <Share className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this post</DialogTitle>
        </DialogHeader>
        <div className="flex justify-around py-4">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              size="icon"
              asChild
              className="size-12 rounded-full"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.icon}
                <span className="sr-only">Share on {link.name}</span>
              </a>
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={url} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={onCopy}>
            <span className="sr-only">Copy</span>
            {hasCopied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
